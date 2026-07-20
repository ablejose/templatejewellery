import { NextResponse } from "next/server";
import { getManifest, saveManifest, getImageResource, destroyImage } from "@/lib/cloudinary";
import { isGroupSlug } from "@/lib/collections";
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
  const categoryId = body?.categoryId;
  const publicId = body?.publicId;
  const name = (body?.name ?? "").toString().trim();

  if (!isGroupSlug(group) || typeof categoryId !== "string" || typeof publicId !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!name) return NextResponse.json({ error: "Product name is required." }, { status: 400 });
  if (name.length > 120) return NextResponse.json({ error: "Product name is too long." }, { status: 400 });
  if (!publicId.startsWith(`hayaz/collections/${group}/${categoryId}/`)) {
    return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  }

  const res = await getImageResource(publicId);
  if (!res) return NextResponse.json({ error: "Uploaded image not found." }, { status: 404 });

  const manifest = await getManifest({ fresh: true });
  const cat = manifest.groups[group].categories.find((c) => c.id === categoryId);
  if (!cat) return NextResponse.json({ error: "Category not found." }, { status: 404 });
  if (!cat.products.some((p) => p.publicId === publicId)) {
    cat.products.push({
      publicId,
      url: res.url,
      width: res.width,
      height: res.height,
      name,
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
  const categoryId = body?.categoryId;
  const publicId = body?.publicId;
  if (!isGroupSlug(group) || typeof categoryId !== "string" || typeof publicId !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const manifest = await getManifest({ fresh: true });
  const cat = manifest.groups[group].categories.find((c) => c.id === categoryId);
  if (cat) cat.products = cat.products.filter((p) => p.publicId !== publicId);
  await saveManifest(manifest);
  await destroyImage(publicId).catch(() => {});
  revalidatePublic();
  return NextResponse.json({ ok: true, group: cat ? manifest.groups[group] : null });
}
