"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Manifest } from "@/lib/collections";
import { emptyManifest } from "@/lib/collections";
import { fetchManifest } from "@/components/admin/cloud";
import { OffersManager } from "@/components/admin/OffersManager";
import { CollectionsManager } from "@/components/admin/CollectionsManager";

type Tab = "collections" | "offers";

export function AdminDashboard() {
  const router = useRouter();
  const [manifest, setManifest] = useState<Manifest>(emptyManifest());
  const [tab, setTab] = useState<Tab>("collections");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      const m = await fetchManifest();
      setManifest(m);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-ivory">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-lux flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl uppercase tracking-[0.22em] text-gold">Hayaz</span>
            <span className="rounded-pill border border-border px-2.5 py-0.5 font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
              Admin
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-pill border border-border px-4 py-1.5 font-sans text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:border-gold hover:text-gold"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="container-lux py-8 md:py-10">
        <div className="mb-8 inline-flex rounded-pill border border-border p-1">
          {(["collections", "offers"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-pill px-5 py-2 font-sans text-sm capitalize transition-colors ${
                tab === t ? "bg-gold text-background" : "text-muted hover:text-ivory"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {error ? (
          <div className="mb-6 rounded-card border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {loading ? (
          <p className="font-sans text-muted">Loading...</p>
        ) : tab === "offers" ? (
          <OffersManager manifest={manifest} reload={reload} />
        ) : (
          <CollectionsManager manifest={manifest} reload={reload} />
        )}
      </main>
    </div>
  );
}
