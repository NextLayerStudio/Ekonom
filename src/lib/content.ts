import {
  BookText,
  Users,
  ReceiptText,
  BarChart3,
  Building2,
  Lightbulb,
  Handshake,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  short: string;
  includes: string[];
  forWhom: string[];
};

export const services: Service[] = [
  {
    slug: "vedenie-uctovnictva",
    icon: BookText,
    title: "Vedenie účtovníctva",
    headline: "Jednoduché aj podvojné účtovníctvo",
    short:
      "Kompletné spracovanie účtovníctva podľa platnej legislatívy. O papierovačky sa postarám ja, vy sa venujte biznisu.",
    includes: [
      "Spracovanie prvotných dokladov",
      "Vedenie účtovného denníka a hlavnej knihy",
      "Evidencia DPH a kontrolné výkazy",
      "Ročná účtovná závierka",
      "Komunikácia s úradmi za vás",
    ],
    forWhom: [
      "Živnostníci a SZČO",
      "Malé a stredné firmy (s.r.o.)",
      "Startupy v raste",
    ],
  },
  {
    slug: "mzdy-a-hr",
    icon: Users,
    title: "Mzdová agenda a HR",
    headline: "Mzdy, odvody, prihlásenia — všetko v poriadku",
    short:
      "Spracovanie miezd, odvodov a prihlášok načas a bez chýb. Vaši zamestnanci budú vždy vyplatení správne.",
    includes: [
      "Mesačné spracovanie miezd",
      "Prihlášky a odhlášky do poisťovní",
      "Ročné zúčtovanie dane zo mzdy",
      "Evidencia dovoleniek a dochádzky",
      "Personálna a mzdová dokumentácia",
    ],
    forWhom: [
      "Firmy so zamestnancami",
      "Rastúce tímy",
      "Firmy s brigádnikmi a dohodármi",
    ],
  },
  {
    slug: "danove-poradenstvo",
    icon: ReceiptText,
    title: "Daňové poradenstvo",
    headline: "Legálne menej platiť na daniach",
    short:
      "Optimalizácia daní v medziach zákona. Poradím vám, ako platiť len toľko, koľko naozaj musíte.",
    includes: [
      "Daň z príjmov FO a PO",
      "Optimalizácia daňového základu",
      "Daňové priznania všetkých typov",
      "Poradenstvo k DPH",
      "Zastupovanie pri kontrolách",
    ],
    forWhom: [
      "Podnikatelia so ziskom",
      "Firmy pred závierkou",
      "Každý, kto chce platiť férovo",
    ],
  },
  {
    slug: "financne-vykazy",
    icon: BarChart3,
    title: "Finančné výkazy a reporting",
    headline: "Viete, kde stojí vaša firma?",
    short:
      "Pravidelné reporty a prehľady, ktorým rozumiete. Rozhodujte sa na základe čísel, nie pocitov.",
    includes: [
      "Mesačné a kvartálne reporty",
      "Cash-flow prehľady",
      "Analýza nákladov a výnosov",
      "Prehľadné dashboardy",
      "Podklady pre banky a investorov",
    ],
    forWhom: [
      "Majitelia, ktorí chcú prehľad",
      "Firmy plánujúce rast",
      "Startupy pred investíciou",
    ],
  },
  {
    slug: "zakladanie-firmy",
    icon: Building2,
    title: "Zakladanie firmy",
    headline: "Začnite správnou nohou",
    short:
      "Založenie s.r.o. či živnosti a start-up poradenstvo od A po Z. Postavíme základy tak, aby ste sa vyhli neskorším problémom.",
    includes: [
      "Založenie s.r.o. a živnosti",
      "Príprava zakladateľských dokumentov",
      "Registrácia na úradoch a daniach",
      "Nastavenie účtovných procesov",
      "Poradenstvo pri rozbehu",
    ],
    forWhom: [
      "Začínajúci podnikatelia",
      "Freelanceri prechádzajúci na s.r.o.",
      "Zakladatelia startupov",
    ],
  },
  {
    slug: "ekonomicke-poradenstvo",
    icon: Lightbulb,
    title: "Ekonomické poradenstvo",
    headline: "Stratégia, nie len čísla",
    short:
      "Pozerám sa na vašu firmu ako partner. Pomôžem s cenotvorbou, plánovaním a rozhodovaním o investíciách.",
    includes: [
      "Nastavenie cenotvorby a marží",
      "Finančné plánovanie a rozpočty",
      "Vyhodnotenie investícií",
      "Poradenstvo pri raste a expanzii",
      "Sparring partner pre majiteľa",
    ],
    forWhom: [
      "Majitelia riešiaci stratégiu",
      "Firmy pred väčším rozhodnutím",
      "Každý, kto chce rásť s prehľadom",
    ],
  },
];

export const values = [
  {
    icon: Handshake,
    title: "Transparentnosť",
    text: "Žiadne skryté poplatky ani prekvapenia. Vždy viete, za čo platíte a prečo.",
  },
  {
    icon: Users,
    title: "Zrozumiteľnosť",
    text: "Vysvetlím vám čísla ľudskou rečou, bez zbytočného účtovníckeho žargónu.",
  },
  {
    icon: ShieldCheck,
    title: "Spoľahlivosť",
    text: "Termíny sú termíny. Na moju prácu sa môžete spoľahnúť za každých okolností.",
  },
];

export const homeValues = [
  {
    icon: BarChart3,
    title: "Poradím v číslach",
    text: "Reálne odporúčania na základe vašich čísel, nie všeobecné frázy.",
  },
  {
    icon: Handshake,
    title: "Ľudský prístup",
    text: "Rozprávam jazykom, ktorému rozumiete. Som partner, nie len dodávateľ.",
  },
  {
    icon: ShieldCheck,
    title: "Spoľahlivosť",
    text: "Termíny a presnosť sú u mňa samozrejmosťou, nie bonusom.",
  },
];

export const industries = [
  "E-commerce a online podnikanie",
  "Obchod a distribúcia",
  "Zdravotníctvo a wellness",
  "Gastronómia a pohostinstvo",
  "Stavebníctvo a remeslá",
  "Kreatívny priemysel (agentúry, freelanceri)",
];

export const certifications = [
  "Vysokoškolské vzdelanie v odbore účtovníctvo a audítorstvo — Ekonomická univerzita v Bratislave",
  "Certifikovaný účtovník — Slovenská komora certifikovaných účtovníkov (SKCÚ)",
  "Pravidelné vzdelávanie v oblasti daňovej legislatívy SR",
  "Člen Slovenskej asociácie podnikových ekonómov",
];

export const process = [
  {
    step: "Krok 1",
    title: "Nezáväzná konzultácia",
    text: "Spoznáme sa, poviete mi o svojej firme a ja navrhnem, ako viem pomôcť.",
  },
  {
    step: "Krok 2",
    title: "Návrh spolupráce",
    text: "Pripravím jasnú ponuku s rozsahom služieb a transparentnou cenou.",
  },
  {
    step: "Krok 3",
    title: "Spustenie",
    text: "Prevezmem agendu, nastavíme procesy a odovzdávanie podkladov.",
  },
  {
    step: "Krok 4",
    title: "Priebežná spolupráca",
    text: "Pravidelný reporting, dostupnosť pri otázkach a proaktívne rady.",
  },
];

export const testimonials = [
  {
    quote:
      "Konečne účtovník, ktorý mi veci vysvetlí po ľudsky. Odkedy spolupracujeme, mám vo firemných financiách poriadok a pokoj.",
    name: "Jana Kováčová",
    role: "majiteľka e-shopu",
  },
  {
    quote:
      "Andrej nám pomohol nastaviť reporting tak, že sa konečne rozhodujeme podľa čísel. Odporúčam každému, kto to s firmou myslí vážne.",
    name: "Martin Novák",
    role: "konateľ s.r.o.",
  },
  {
    quote:
      "Spoľahlivosť na 100 %. Termíny vždy dodrží a keď mám otázku, ozve sa obratom. Presne to som od účtovníka potreboval.",
    name: "Peter Horváth",
    role: "freelancer",
  },
];
