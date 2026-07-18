import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, ADMIN_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  const ae = new TextEncoder().encode(a);
  const be = new TextEncoder().encode(b);
  let equal = ae.length === be.length ? 1 : 0;
  const len = Math.max(ae.length, be.length);
  for (let i = 0; i < len; i++) {
    if ((ae[i] ?? 0) !== (be[i] ?? 0)) equal = 0;
  }
  return equal === 1;
}

export async function POST(req: Request) {
  const secret = process.env.SESSION_SECRET ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!secret || !adminPassword) {
    return NextResponse.json({ error: "Admin is not configured on the server." }, { status: 500 });
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!safeEqual(password, adminPassword)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken(secret);
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return NextResponse.json({ ok: true });
}
