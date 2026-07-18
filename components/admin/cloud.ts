"use client";

import type { Manifest } from "@/lib/collections";

export interface UploadResult {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

export type UploadTarget =
  | { kind: "offer" }
  | { kind: "product"; group: string; categoryId: string };

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  const MAX_DIM = 2400;
  const MAX_BYTES = 9_000_000;
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const scale = Math.min(1, MAX_DIM / Math.max(width, height));
    if (scale === 1 && file.size <= MAX_BYTES) {
      bitmap.close();
      return file;
    }
    const w = Math.round(width * scale);
    const h = Math.round(height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9),
    );
    if (!blob) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export async function signAndUpload(file: File, target: UploadTarget): Promise<UploadResult> {
  const prepared = await compressImage(file);

  const signRes = await fetch("/api/admin/sign-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(target),
  });
  if (!signRes.ok) {
    const d = await signRes.json().catch(() => ({}));
    throw new Error(d.error || "Could not authorize upload.");
  }
  const { signature, timestamp, apiKey, cloudName, publicId } = await signRes.json();

  const form = new FormData();
  form.append("file", prepared);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("public_id", publicId);

  const up = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!up.ok) {
    const t = await up.text().catch(() => "");
    throw new Error("Upload failed. " + t.slice(0, 140));
  }
  const data = await up.json();
  return {
    publicId: data.public_id as string,
    url: data.secure_url as string,
    width: data.width as number,
    height: data.height as number,
  };
}

export async function apiJson(url: string, method: string, body: unknown): Promise<any> {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed.");
  return data;
}

export async function fetchManifest(): Promise<Manifest> {
  const res = await fetch("/api/admin/manifest", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load data.");
  return res.json();
}
