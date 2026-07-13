"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const from = params.get("from") || "/admin";
      router.replace(from);
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Prihlásenie zlyhalo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold">{site.name}</p>
          <p className="text-sm text-muted">Administrácia</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-line bg-white p-8 shadow-sm"
        >
          <h1 className="mb-6 text-xl">Prihlásenie</h1>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-muted">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="rounded-lg border border-line px-4 py-2.5 outline-none focus:border-ink"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-muted">
                Heslo
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="rounded-lg border border-line px-4 py-2.5 outline-none focus:border-ink"
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Prihlasujem…" : "Prihlásiť sa"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
