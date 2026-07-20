import { v2 as cloudinaryV2 } from "cloudinary";
import { emptyManifest, normalizeManifest, type Manifest, type CloudKey } from "@/lib/collections";

// The SDK's types are inconsistent across calls; treat as any for compile safety.
const cloudinary: any = cloudinaryV2;

interface CloudCreds {
  cloud_name?: string;
  api_key?: string;
  api_secret?: string;
}

// Two Cloudinary accounts:
//   primary -> offers, gold-silver & diamond products, and the manifest.
//   media   -> home banners and Platinum product images.
function creds(which: CloudKey): CloudCreds {
  if (which === "media") {
    return {
      cloud_name: process.env.CLOUDINARY_MEDIA_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_MEDIA_API_KEY,
      api_secret: process.env.CLOUDINARY_MEDIA_API_SECRET,
    };
  }
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
}

// Pass credentials per call so the two accounts never share mutable global
// state (safe under concurrent requests). secure:true forces https URLs.
function opts(which: CloudKey, extra?: Record<string, unknown>) {
  return { ...creds(which), secure: true, ...(extra ?? {}) };
}

const MANIFEST_PUBLIC_ID = "hayaz/data/manifest";

export async function getManifest(o?: { fresh?: boolean }): Promise<Manifest> {
  const fresh = o?.fresh ?? false;
  try {
    const res = await cloudinary.api.resource(MANIFEST_PUBLIC_ID, opts("primary", { resource_type: "raw" }));
    const url: string = res.secure_url;
    const r = await fetch(url, fresh ? { cache: "no-store" } : { cache: "force-cache" });
    if (!r.ok) return emptyManifest();
    return normalizeManifest(await r.json());
  } catch {
    return emptyManifest();
  }
}

export async function saveManifest(manifest: Manifest): Promise<void> {
  manifest.updatedAt = Date.now();
  const buffer = Buffer.from(JSON.stringify(manifest));
  await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      opts("primary", {
        resource_type: "raw",
        public_id: MANIFEST_PUBLIC_ID,
        overwrite: true,
        invalidate: true,
      }),
      (err: any, result: any) => (err ? reject(err) : resolve(result)),
    );
    stream.end(buffer);
  });
}

export function signUpload(paramsToSign: Record<string, string>, which: CloudKey = "primary") {
  const c = creds(which);
  const timestamp = Math.round(Date.now() / 1000);
  const toSign = { ...paramsToSign, timestamp: String(timestamp) };
  const signature = cloudinary.utils.api_sign_request(toSign, c.api_secret as string);
  return {
    signature,
    timestamp,
    apiKey: c.api_key as string,
    cloudName: c.cloud_name as string,
  };
}

export async function getImageResource(publicId: string, which: CloudKey = "primary") {
  try {
    const r = await cloudinary.api.resource(publicId, opts(which, { resource_type: "image" }));
    return { url: r.secure_url as string, width: r.width as number, height: r.height as number };
  } catch {
    return null;
  }
}

export async function destroyImage(publicId: string, which: CloudKey = "primary"): Promise<void> {
  await cloudinary.uploader.destroy(publicId, opts(which, { resource_type: "image", invalidate: true }));
}

export async function destroyManyImages(publicIds: string[], which: CloudKey = "primary"): Promise<void> {
  if (publicIds.length === 0) return;
  for (let i = 0; i < publicIds.length; i += 100) {
    await cloudinary.api.delete_resources(
      publicIds.slice(i, i + 100),
      opts(which, { resource_type: "image", invalidate: true }),
    );
  }
}
