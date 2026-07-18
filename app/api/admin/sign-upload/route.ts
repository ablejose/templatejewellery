import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { signUpload } from "@/lib/cloudinary";
import { isGroupSlug } from "@/lib/collections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const kind = body?.kind;
  let publicId = "";

  if (kind === "offer") {
    publicId = `hayaz/offers/${randomUUID()}`;
  } else if (kind === "product") {
    const group = body?.group;
    const categoryId = body?.categoryId;
    if (!isGroupSlug(group) || typeof categoryId !== "string" || !/^[a-z0-9-]+$/i.test(categoryId)) {
      return NextResponse.json({ error: "Invalid upload target." }, { status: 400 });
    }
    publicId = `hayaz/collections/${group}/${categoryId}/${randomUUID()}`;
  } else {
    return NextResponse.json({ error: "Invalid upload kind." }, { status: 400 });
  }

  const signed = signUpload({ public_id: publicId });
  return NextResponse.json({ ...signed, publicId });
}
