"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Odoslanie zlyhalo.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Odoslanie zlyhalo.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8">
        <h3 className="text-2xl">Ďakujem za správu!</h3>
        <p className="mt-2 text-muted">
          Ozvem sa vám čo najskôr, zvyčajne do 24 hodín.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Napísať ďalšiu správu
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-6 md:p-8"
    >
      <div className="grid gap-4">
        <Field label="Meno a priezvisko" name="name" required />
        <Field label="E-mail" name="email" type="email" required />
        <Field label="Telefón" name="phone" />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm text-muted">
            Vaša správa
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? "Odosielam…" : "Odoslať"}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        Odoslaním súhlasíte so spracovaním údajov za účelom odpovede.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm text-muted">
        {label}
        {required && <span className="text-ink"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}
