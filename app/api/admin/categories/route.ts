import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getManifest, saveManifest, destroyManyImages, cloudForUrl } from "@/lib/cloudinary";
import { isGroupSlug, slugify } from "@/lib/collections";
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
  const name = (body?.name ?? "").toString().trim();
  if (!isGroupSlug(group)) return NextResponse.json({ error: "Invalid group." }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  if (name.length > 80) return NextResponse.json({ error: "Category name is too long." }, { status: 400 });

  const manifest = await getManifest({ fresh: true });
  const cats = manifest.groups[group].categories;
  if (cats.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
    return NextResponse.json({ error: "A category with that name already exists." }, { status: 409 });
  }
  const order = cats.length ? Math.max(...cats.map((c) => c.order)) + 1 : 0;
  cats.push({ id: randomUUID(), slug: slugify(name), name, order, products: [] });
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
  const id = body?.id;
  if (!isGroupSlug(group) || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const manifest = await getManifest({ fresh: true });
  const cats = manifest.groups[group].categories;
  const cat = cats.find((c) => c.id === id);
  if (!cat) return NextResponse.json({ error: "Category not found." }, { status: 404 });
  const products = cat.products;
  manifest.groups[group].categories = cats.filter((c) => c.id !== id);
  await saveManifest(manifest);

  // Partition deletes by the cloud each image actually lives on.
  const primaryIds = products.filter((p) => cloudForUrl(p.url) === "primary").map((p) => p.publicId);
  const mediaIds = products.filter((p) => cloudForUrl(p.url) === "media").map((p) => p.publicId);
  await destroyManyImages(primaryIds, "primary").catch(() => {});
  await destroyManyImages(mediaIds, "media").catch(() => {});
  revalidatePublic();
  return NextResponse.json({ ok: true, group: manifest.groups[group] });
}
