import { NextResponse } from "next/server";
import { getManifest, saveManifest, getImageResource, destroyImage } from "@/lib/cloudinary";
import { revalidatePublic } from "@/lib/revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const publicId = body?.publicId;
  if (typeof publicId !== "string" || !publicId.startsWith("hayaz/offers/")) {
    return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  }
  const res = await getImageResource(publicId);
  if (!res) return NextResponse.json({ error: "Uploaded image not found." }, { status: 404 });

  const manifest = await getManifest({ fresh: true });
  if (!manifest.offers.some((o) => o.publicId === publicId)) {
    manifest.offers.unshift({
      publicId,
      url: res.url,
      width: res.width,
      height: res.height,
      createdAt: Date.now(),
    });
  }
  await saveManifest(manifest);
  revalidatePublic();
  return NextResponse.json({ ok: true, offers: manifest.offers });
}

export async function DELETE(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const publicId = body?.publicId;
  if (typeof publicId !== "string") {
    return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  }
  const manifest = await getManifest({ fresh: true });
  manifest.offers = manifest.offers.filter((o) => o.publicId !== publicId);
  await saveManifest(manifest);
  await destroyImage(publicId).catch(() => {});
  revalidatePublic();
  return NextResponse.json({ ok: true, offers: manifest.offers });
}
