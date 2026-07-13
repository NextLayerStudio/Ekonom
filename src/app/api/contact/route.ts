import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "Zadajte meno."),
  email: z.string().email("Neplatný e-mail."),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Správa je príliš krátka."),
});

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatná požiadavka." }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Neplatné údaje." },
      { status: 422 }
    );
  }

  const { name, email, phone, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    // Allows local testing before Resend is configured.
    console.warn("[contact] RESEND_API_KEY not set — logging message instead.");
    console.info({ name, email, phone, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Web kontakt <${from}>`,
      to,
      replyTo: email,
      subject: `Nová správa z webu — ${name}`,
      text: [
        `Meno: ${name}`,
        `E-mail: ${email}`,
        `Telefón: ${phone || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Správu sa nepodarilo odoslať." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Nastala chyba." }, { status: 500 });
  }
}
