import { NextResponse } from "next/server";
import { getManifest, saveManifest, getImageResource, destroyImage, cloudForUrl } from "@/lib/cloudinary";
import { isGroupSlug, MAX_BANNERS_PER_GROUP } from "@/lib/collections";
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
  const group = body?.group;
  const publicId = body?.publicId;
  if (!isGroupSlug(group) || typeof publicId !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!publicId.startsWith(`hayaz/banners/${group}/`)) {
    return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  }

  // Banners live on the media cloud (credsFor falls back to primary if the
  // media cloud is not configured, matching how sign-upload signed the asset).
  const res = await getImageResource(publicId, "media");
  if (!res) return NextResponse.json({ error: "Uploaded image not found." }, { status: 404 });

  const manifest = await getManifest({ fresh: true });
  const gd = manifest.groups[group];
  if (gd.banners.length >= MAX_BANNERS_PER_GROUP) {
    return NextResponse.json(
      { error: `You can add up to ${MAX_BANNERS_PER_GROUP} banners for this section.` },
      { status: 409 },
    );
  }
  if (!gd.banners.some((b) => b.publicId === publicId)) {
    gd.banners.push({
      publicId,
      url: res.url,
      width: res.width,
      height: res.height,
      createdAt: Date.now(),
    });
  }
  await saveManifest(manifest);
  revalidatePublic();
  return NextResponse.json({ ok: true, group: manifest.groups[group] });
}

export async function DELETE(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const group = body?.group;
  const publicId = body?.publicId;
  if (!isGroupSlug(group) || typeof publicId !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const manifest = await getManifest({ fresh: true });
  const gd = manifest.groups[group];
  const target = gd.banners.find((b) => b.publicId === publicId);
  gd.banners = gd.banners.filter((b) => b.publicId !== publicId);
  await saveManifest(manifest);
  await destroyImage(publicId, cloudForUrl(target?.url)).catch(() => {});
  revalidatePublic();
  return NextResponse.json({ ok: true, group: manifest.groups[group] });
}
