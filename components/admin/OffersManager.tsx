"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Manifest } from "@/lib/collections";
import { signAndUpload, apiJson } from "@/components/admin/cloud";

interface Props {
  manifest: Manifest;
  reload: () => Promise<void>;
}

export function OffersManager({ manifest, reload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    const list = Array.from(files);
    let done = 0;
    try {
      for (const file of list) {
        setStatus("Uploading " + (done + 1) + " of " + list.length + "...");
        const up = await signAndUpload(file, { kind: "offer" });
        await apiJson("/api/admin/offers", "POST", { publicId: up.publicId });
        done += 1;
      }
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      setStatus("");
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(publicId: string) {
    if (!window.confirm("Delete this offer image? This cannot be undone.")) return;
    setBusy(true);
    setError("");
    try {
      await apiJson("/api/admin/offers", "DELETE", { publicId });
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-card border border-border bg-white/[0.02] p-6">
        <h2 className="font-display text-2xl text-ivory">Offers</h2>
        <p className="mt-1 font-sans text-sm text-muted">
          Upload offer posters. They appear on the public Offers page in a vertical scroll, newest first.
        </p>
        <div className="mt-5">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            disabled={busy}
            onChange={(e) => onFiles(e.target.files)}
            className="block w-full cursor-pointer rounded-lg border border-dashed border-border bg-transparent px-4 py-6 font-sans text-sm text-muted file:mr-4 file:rounded-pill file:border-0 file:bg-gold file:px-4 file:py-2 file:font-sans file:text-sm file:text-background hover:border-gold/60"
          />
          {busy ? <p className="mt-3 font-sans text-sm text-gold">{status || "Working..."}</p> : null}
        </div>
      </section>

      {error ? (
        <div className="rounded-card border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {manifest.offers.length === 0 ? (
        <p className="font-sans text-sm text-muted">No offers uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {manifest.offers.map((o) => (
            <div key={o.publicId} className="group relative overflow-hidden rounded-card border border-border">
              <Image
                src={o.url}
                alt="Offer"
                width={o.width}
                height={o.height}
                sizes="220px"
                className="h-44 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(o.publicId)}
                disabled={busy}
                className="absolute right-2 top-2 rounded-pill bg-black/70 px-3 py-1 font-sans text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
