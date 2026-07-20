"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Manifest, Category, BannerItem } from "@/lib/collections";
import { GROUPS, MAX_BANNERS_PER_GROUP } from "@/lib/collections";
import { signAndUpload, apiJson } from "@/components/admin/cloud";

interface Props {
  manifest: Manifest;
  reload: () => Promise<void>;
}

export function CollectionsManager({ manifest, reload }: Props) {
  const [group, setGroup] = useState<string>(GROUPS[0].slug);
  const [newCategory, setNewCategory] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const categories = useMemo(() => {
    const cats = manifest.groups[group]?.categories ?? [];
    return [...cats].sort((a, b) => a.order - b.order);
  }, [manifest, group]);

  const banners = manifest.groups[group]?.banners ?? [];

  async function createCategory() {
    const name = newCategory.trim();
    if (!name) return;
    setBusy(true);
    setError("");
    try {
      await apiJson("/api/admin/categories", "POST", { group, name });
      setNewCategory("");
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create category.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteCategory(cat: Category) {
    if (
      !window.confirm(
        "Delete category \"" + cat.name + "\" and its " + cat.products.length + " image(s)? This cannot be undone.",
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await apiJson("/api/admin/categories", "DELETE", { group, id: cat.id });
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete category.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g.slug}
            type="button"
            onClick={() => setGroup(g.slug)}
            className={`rounded-pill border px-5 py-2 font-sans text-sm transition-colors ${
              group === g.slug
                ? "border-gold bg-gold text-background"
                : "border-border text-muted hover:border-gold/60 hover:text-ivory"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <BannerPanel group={group} banners={banners} reload={reload} />

      <section className="rounded-card border border-border bg-white/[0.02] p-6">
        <h2 className="font-display text-xl text-ivory">Add a category</h2>
        <p className="mt-1 font-sans text-sm text-muted">
          Create a category first (for example, &ldquo;Mehza&rdquo;). Images can only be added inside a category.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") createCategory();
            }}
            placeholder="Category name"
            maxLength={80}
            disabled={busy}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2.5 font-sans text-sm text-ivory placeholder:text-muted focus:border-gold focus:outline-none"
          />
          <button
            type="button"
            onClick={createCategory}
            disabled={busy || !newCategory.trim()}
            className="shrink-0 rounded-pill bg-gold px-6 py-2.5 font-sans text-sm text-background transition-opacity disabled:opacity-40"
          >
            Create
          </button>
        </div>
      </section>

      {error ? (
        <div className="rounded-card border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {categories.length === 0 ? (
        <p className="font-sans text-sm text-muted">No categories yet. Create one above to start.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              group={group}
              index={index}
              category={cat}
              busyParent={busy}
              reload={reload}
              onDelete={() => deleteCategory(cat)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface BannerPanelProps {
  group: string;
  banners: BannerItem[];
  reload: () => Promise<void>;
}

function BannerPanel({ group, banners, reload }: BannerPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const remaining = MAX_BANNERS_PER_GROUP - banners.length;

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files).slice(0, Math.max(0, remaining));
    if (list.length === 0) {
      setError("You already have " + MAX_BANNERS_PER_GROUP + " banners. Delete one to add more.");
      return;
    }
    setBusy(true);
    setError("");
    let done = 0;
    try {
      for (const file of list) {
        setStatus("Uploading " + (done + 1) + " of " + list.length + "...");
        const up = await signAndUpload(file, { kind: "banner", group });
        await apiJson("/api/admin/banners", "POST", { group, publicId: up.publicId });
        done += 1;
      }
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      setStatus("");
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(publicId: string) {
    if (!window.confirm("Delete this banner? This cannot be undone.")) return;
    setBusy(true);
    setError("");
    try {
      await apiJson("/api/admin/banners", "DELETE", { group, publicId });
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-card border border-gold/30 bg-gold/[0.03] p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl text-ivory">Home banners</h2>
        <span className="rounded-pill border border-border px-2.5 py-0.5 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
          {banners.length} / {MAX_BANNERS_PER_GROUP}
        </span>
      </div>
      <p className="mt-1 font-sans text-sm text-muted">
        These images are the slideshow for this section on the home page &ldquo;Our Collections&rdquo;. Up to {MAX_BANNERS_PER_GROUP} per section &mdash; wide banner images work best.
      </p>

      <div className="mt-5">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={busy || remaining <= 0}
          onChange={(e) => onFiles(e.target.files)}
          className="block w-full cursor-pointer rounded-lg border border-dashed border-border bg-transparent px-4 py-6 font-sans text-sm text-muted file:mr-4 file:rounded-pill file:border-0 file:bg-gold file:px-4 file:py-2 file:font-sans file:text-sm file:text-background hover:border-gold/60 disabled:cursor-not-allowed disabled:opacity-40"
        />
        {remaining <= 0 ? (
          <p className="mt-2 font-sans text-xs text-muted">Limit reached. Delete a banner to add another.</p>
        ) : null}
        {busy ? <p className="mt-3 font-sans text-sm text-gold">{status || "Working..."}</p> : null}
      </div>

      {error ? <p className="mt-3 font-sans text-sm text-red-300">{error}</p> : null}

      {banners.length === 0 ? (
        <p className="mt-5 font-sans text-sm text-muted">
          No banners yet. Upload up to {MAX_BANNERS_PER_GROUP} to show this section on the home page.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {banners.map((b) => (
            <div key={b.publicId} className="group relative overflow-hidden rounded-lg border border-border">
              <Image
                src={b.url}
                alt="Banner"
                width={b.width}
                height={b.height}
                sizes="(max-width: 640px) 100vw, 360px"
                className="h-32 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(b.publicId)}
                disabled={busy}
                className="absolute right-2 top-2 rounded-pill bg-black/70 px-3 py-1 font-sans text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

interface CardProps {
  group: string;
  index: number;
  category: Category;
  busyParent: boolean;
  reload: () => Promise<void>;
  onDelete: () => void;
}

function CategoryCard({ group, index, category, busyParent, reload, onDelete }: CardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function addProduct() {
    setError("");
    if (!file) {
      setError("Choose an image.");
      return;
    }
    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }
    setBusy(true);
    try {
      const up = await signAndUpload(file, { kind: "product", group, categoryId: category.id });
      await apiJson("/api/admin/products", "POST", {
        group,
        categoryId: category.id,
        publicId: up.publicId,
        name: name.trim(),
      });
      setName("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add product.");
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct(publicId: string) {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    setBusy(true);
    setError("");
    try {
      await apiJson("/api/admin/products", "DELETE", { group, categoryId: category.id, publicId });
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete image.");
    } finally {
      setBusy(false);
    }
  }

  const disabled = busy || busyParent;

  return (
    <section className="rounded-card border border-border bg-white/[0.02] p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-gold">
          {index + 1}. {category.name}
        </h3>
        <button
          type="button"
          onClick={onDelete}
          disabled={disabled}
          className="rounded-pill border border-border px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:border-red-400 hover:text-red-300"
        >
          Delete category
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-border/70 p-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name (required)"
          maxLength={120}
          disabled={disabled}
          className="w-full rounded-lg border border-border bg-transparent px-4 py-2.5 font-sans text-sm text-ivory placeholder:text-muted focus:border-gold focus:outline-none sm:max-w-xs"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full font-sans text-sm text-muted file:mr-3 file:rounded-pill file:border-0 file:bg-border file:px-4 file:py-2 file:font-sans file:text-sm file:text-ivory"
        />
        <button
          type="button"
          onClick={addProduct}
          disabled={disabled}
          className="shrink-0 rounded-pill bg-gold px-6 py-2.5 font-sans text-sm text-background transition-opacity disabled:opacity-40"
        >
          {busy ? "Adding..." : "Add"}
        </button>
      </div>

      {error ? <p className="mt-3 font-sans text-sm text-red-300">{error}</p> : null}

      {category.products.length === 0 ? (
        <p className="mt-5 font-sans text-sm text-muted">No products yet.</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {category.products.map((p) => (
            <div key={p.publicId} className="group relative overflow-hidden rounded-lg border border-border">
              <Image
                src={p.url}
                alt={p.name}
                width={p.width}
                height={p.height}
                sizes="220px"
                className="h-40 w-full bg-white object-contain"
              />
              <div className="truncate px-2 py-1.5 font-sans text-xs text-muted">{p.name}</div>
              <button
                type="button"
                onClick={() => removeProduct(p.publicId)}
                disabled={disabled}
                className="absolute right-2 top-2 rounded-pill bg-black/70 px-3 py-1 font-sans text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
