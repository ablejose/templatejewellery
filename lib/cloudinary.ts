import { v2 as cloudinaryV2 } from "cloudinary";
import { emptyManifest, normalizeManifest, type Manifest } from "@/lib/collections";

// The SDK's types are inconsistent across calls; treat as any for compile safety.
const cloudinary: any = cloudinaryV2;

let configured = false;
function cfg() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
}

const MANIFEST_PUBLIC_ID = "hayaz/data/manifest";

export async function getManifest(opts?: { fresh?: boolean }): Promise<Manifest> {
  const fresh = opts?.fresh ?? false;
  try {
    const c = cfg();
    const res = await c.api.resource(MANIFEST_PUBLIC_ID, { resource_type: "raw" });
    const url: string = res.secure_url;
    const r = await fetch(url, fresh ? { cache: "no-store" } : { cache: "force-cache" });
    if (!r.ok) return emptyManifest();
    return normalizeManifest(await r.json());
  } catch {
    return emptyManifest();
  }
}

export async function saveManifest(manifest: Manifest): Promise<void> {
  const c = cfg();
  manifest.updatedAt = Date.now();
  const buffer = Buffer.from(JSON.stringify(manifest));
  await new Promise((resolve, reject) => {
    const stream = c.uploader.upload_stream(
      { resource_type: "raw", public_id: MANIFEST_PUBLIC_ID, overwrite: true, invalidate: true },
      (err: any, result: any) => (err ? reject(err) : resolve(result)),
    );
    stream.end(buffer);
  });
}

export function signUpload(paramsToSign: Record<string, string>) {
  const c = cfg();
  const timestamp = Math.round(Date.now() / 1000);
  const toSign = { ...paramsToSign, timestamp: String(timestamp) };
  const signature = c.utils.api_sign_request(toSign, process.env.CLOUDINARY_API_SECRET as string);
  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  };
}

export async function getImageResource(publicId: string) {
  try {
    const c = cfg();
    const r = await c.api.resource(publicId, { resource_type: "image" });
    return { url: r.secure_url as string, width: r.width as number, height: r.height as number };
  } catch {
    return null;
  }
}

export async function destroyImage(publicId: string): Promise<void> {
  const c = cfg();
  await c.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
}

export async function destroyManyImages(publicIds: string[]): Promise<void> {
  if (publicIds.length === 0) return;
  const c = cfg();
  for (let i = 0; i < publicIds.length; i += 100) {
    await c.api.delete_resources(publicIds.slice(i, i + 100), {
      resource_type: "image",
      invalidate: true,
    });
  }
}
