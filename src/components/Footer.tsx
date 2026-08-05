import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo size="sm" />
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            Navigácia
          </h4>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink hover:text-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            Sociálne siete
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.social.facebook} className="inline-flex items-center gap-2 text-ink hover:text-muted">
                <FacebookIcon size={16} /> Facebook
              </a>
            </li>
            <li>
              <a href={site.social.instagram} className="inline-flex items-center gap-2 text-ink hover:text-muted">
                <InstagramIcon size={16} /> Instagram
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} className="inline-flex items-center gap-2 text-ink hover:text-muted">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            Kontakt
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 text-ink hover:text-muted">
                <Phone size={16} /> {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="inline-flex items-center gap-2 text-ink hover:text-muted">
                <Mail size={16} /> {site.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2 text-ink">
              <MapPin size={16} className="mt-0.5" /> {site.address}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Všetky práva vyhradené.
          </p>
          <p>IČO: {site.ico}</p>
        </Container>
      </div>
    </footer>
  );
}
