// Custom next/image loader. Delivers Cloudinary images through Cloudinary's own
// CDN with automatic format (AVIF/WebP), automatic quality, and width-limited
// resizing (f_auto,q_auto,c_limit,w_<needed>). This moves image optimization
// off Vercel (whose Hobby-plan optimizer is quota-limited) and onto Cloudinary's
// edge, so images are smaller, modern-format, and CDN-cached.
//
// It works across BOTH Cloudinary accounts because the cloud name is read from
// the incoming URL, never hardcoded. Any non-Cloudinary src (local /public
// assets, other hosts) is returned unchanged so nothing else can break.

interface CloudinaryLoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

const UPLOAD_MARKER = "/image/upload/";

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderArgs): string {
  // Only rewrite Cloudinary delivery URLs; pass everything else through as-is.
  if (!src.includes("res.cloudinary.com") || !src.includes(UPLOAD_MARKER)) {
    return src;
  }

  const markerIndex = src.indexOf(UPLOAD_MARKER);
  const prefix = src.slice(0, markerIndex);
  const rest = src.slice(markerIndex + UPLOAD_MARKER.length);

  // Idempotent: if transforms were already injected, leave the URL untouched
  // so we never stack f_auto/q_auto segments.
  if (rest.startsWith("f_auto") || rest.includes("q_auto")) {
    return src;
  }

  const q = quality ? String(quality) : "auto";
  // c_limit never upscales past the original; w_ caps delivered width to what
  // the layout needs at this breakpoint (Next passes DPR-aware widths).
  const transforms = `f_auto,q_${q},c_limit,w_${width}`;

  return `${prefix}${UPLOAD_MARKER}${transforms}/${rest}`;
}
