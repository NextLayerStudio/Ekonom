# Happy Gold — ekonóm & účtovník

Informačný web s kontaktným formulárom a administráciou blogu.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma + Neon (PostgreSQL) · Resend · Tiptap editor.

Font: **Libre Caslon Text**. Akcentová farba: **#FCEE23**.

---

## Rýchly štart

```bash
npm install
cp .env.example .env   # doplňte reálne hodnoty
npm run dev            # http://localhost:3000
```

Web sa spustí aj bez databázy — blog jednoducho zobrazí prázdny stav,
kým nepripojíte Neon.

## Štruktúra

- `src/app/(site)/` — verejný web
  - `/` domov, `/o-firme`, `/sluzby`, `/blog`, `/blog/[slug]`, `/kontakt`
- `src/app/admin/` — administrácia (prihlásenie + správa blogu)
  - `/admin/login`, `/admin` (prehľad), `/admin/posts/new`, `/admin/posts/[id]/edit`
- `src/app/api/` — API routes (kontakt, auth, blog CRUD)
- `src/components/` — komponenty (verejné + `admin/` + `ui/`)
- `src/lib/` — obsah, dáta, auth, prisma
- `prisma/` — schéma databázy a seed

Sivé plochy v dizajne sú `ImagePlaceholder` — nahradia sa reálnymi fotkami
tak, že komponentu odovzdáte `src`.

## Databáza (Neon + Prisma)

1. Vytvorte projekt na [neon.tech](https://neon.tech) a skopírujte connection stringy.
2. Do `.env` doplňte `DATABASE_URL` (pooled) a `DIRECT_URL` (direct).
3. Vytvorte tabuľky a prvého admina:

```bash
npm run db:migrate     # vytvorí tabuľky (alebo: npm run db:push)
npm run db:seed        # vytvorí admin účet z ADMIN_EMAIL / ADMIN_PASSWORD
```

`npm run db:studio` otvorí Prisma Studio pre prehľad dát.

## Prihlásenie do administrácie

`/admin/login` — údaje podľa `ADMIN_EMAIL` a `ADMIN_PASSWORD` z `.env`
(nastavené pri `db:seed`). Session je podpísaný `AUTH_SECRET` cookie.

## Kontaktný formulár (Resend)

1. Vytvorte API kľúč na [resend.com](https://resend.com).
2. Do `.env` doplňte `RESEND_API_KEY`, `CONTACT_TO_EMAIL` a `CONTACT_FROM_EMAIL`
   (odosielateľ musí byť overená doména; na testy funguje `onboarding@resend.dev`).

Bez `RESEND_API_KEY` sa správa iba zaloguje do konzoly (vhodné pre lokálny vývoj).

## Nasadenie

Odporúčaný Vercel. Nastavte rovnaké premenné prostredia ako v `.env`.
`npm run build` spúšťa `prisma generate` automaticky.
