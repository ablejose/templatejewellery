"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-ivory">
      <form onSubmit={submit} className="w-full max-w-sm rounded-card border border-border bg-white/[0.02] p-8">
        <div className="mb-6 text-center">
          <span className="font-display text-2xl uppercase tracking-[0.22em] text-gold">Hayaz</span>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.18em] text-muted">Admin access</p>
        </div>
        <label className="block font-sans text-sm text-muted" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-lg border border-border bg-transparent px-4 py-2.5 font-sans text-sm text-ivory focus:border-gold focus:outline-none"
        />
        {error ? <p className="mt-3 font-sans text-sm text-red-300">{error}</p> : null}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-pill bg-gold px-6 py-3 font-sans text-sm text-background transition-opacity disabled:opacity-40"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
