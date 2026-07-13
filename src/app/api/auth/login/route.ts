import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatné údaje." }, { status: 422 });
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Nesprávny e-mail alebo heslo." },
        { status: 401 }
      );
    }

    await createSession({ userId: user.id, email: user.email, name: user.name });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[login] error:", err);
    return NextResponse.json(
      { error: "Prihlásenie zlyhalo. Skontrolujte pripojenie k databáze." },
      { status: 500 }
    );
  }
}
