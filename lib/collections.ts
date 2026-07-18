export const GROUPS = [
  { slug: "gold-silver", title: "Gold & Silver" },
  { slug: "platinum", title: "Platinum" },
  { slug: "diamond", title: "Diamond" },
] as const;

export type GroupSlug = (typeof GROUPS)[number]["slug"];

export function isGroupSlug(value: unknown): value is GroupSlug {
  return typeof value === "string" && GROUPS.some((g) => g.slug === value);
}

export function groupTitle(slug: string): string {
  return GROUPS.find((g) => g.slug === slug)?.title ?? slug;
}

export interface OfferItem {
  publicId: string;
  url: string;
  width: number;
  height: number;
  createdAt: number;
}

export interface ProductItem {
  publicId: string;
  url: string;
  width: number;
  height: number;
  name: string;
  createdAt: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  order: number;
  products: ProductItem[];
}

export interface GroupData {
  categories: Category[];
}

export interface Manifest {
  version: number;
  offers: OfferItem[];
  groups: Record<string, GroupData>;
  updatedAt: number;
}

export function emptyManifest(): Manifest {
  const groups: Record<string, GroupData> = {};
  for (const g of GROUPS) groups[g.slug] = { categories: [] };
  return { version: 1, offers: [], groups, updatedAt: 0 };
}

/** Defensive: guarantee a well-formed manifest even from partial/old JSON. */
export function normalizeManifest(input: unknown): Manifest {
  const base = emptyManifest();
  if (!input || typeof input !== "object") return base;
  const m = input as Partial<Manifest>;

  base.version = typeof m.version === "number" ? m.version : 1;
  base.updatedAt = typeof m.updatedAt === "number" ? m.updatedAt : 0;
  base.offers = Array.isArray(m.offers)
    ? m.offers.filter((o) => o && typeof (o as OfferItem).publicId === "string")
    : [];

  const srcGroups = (m.groups && typeof m.groups === "object" ? m.groups : {}) as Record<string, GroupData>;
  for (const g of GROUPS) {
    const gd = srcGroups[g.slug];
    const cats = Array.isArray(gd?.categories) ? gd.categories : [];
    base.groups[g.slug] = {
      categories: cats
        .filter((c) => c && typeof c.id === "string")
        .map((c) => ({
          id: c.id,
          slug: typeof c.slug === "string" ? c.slug : slugify(c.name ?? c.id),
          name: typeof c.name === "string" ? c.name : c.id,
          order: typeof c.order === "number" ? c.order : 0,
          products: Array.isArray(c.products)
            ? c.products.filter((p) => p && typeof (p as ProductItem).publicId === "string")
            : [],
        })),
    };
  }
  return base;
}

export function slugify(input: string): string {
  const s = (input ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.slice(0, 60) || "category";
}
