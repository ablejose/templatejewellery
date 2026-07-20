import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TEMPORARY diagnostic. Reports ONLY whether each server env var is present
// (booleans, never their values) plus which Vercel deployment/environment is
// running. Safe to expose briefly; delete this route once the admin env vars
// are confirmed working.
export async function GET() {
  const present = (v: string | undefined) =>
    typeof v === "string" && v.trim().length > 0;
  return NextResponse.json(
    {
      vercelEnv: process.env.VERCEL_ENV ?? null,
      vercelUrl: process.env.VERCEL_URL ?? null,
      nodeEnv: process.env.NODE_ENV ?? null,
      present: {
        SESSION_SECRET: present(process.env.SESSION_SECRET),
        ADMIN_PASSWORD: present(process.env.ADMIN_PASSWORD),
        CLOUDINARY_CLOUD_NAME: present(process.env.CLOUDINARY_CLOUD_NAME),
        CLOUDINARY_API_KEY: present(process.env.CLOUDINARY_API_KEY),
        CLOUDINARY_API_SECRET: present(process.env.CLOUDINARY_API_SECRET),
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
