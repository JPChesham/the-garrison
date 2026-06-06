import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { footerNavLinks, legalLinks, siteConfig } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-light bg-charcoal-mid py-10">
      <Container>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="mb-1 font-bebas text-4xl leading-none tracking-widest text-ember">
              {siteConfig.name}
            </p>
            <p className="mb-4 font-barlow text-xs font-semibold uppercase tracking-wider text-charcoal-light">
              {siteConfig.tagline}
            </p>
            <SocialLinks variant="footer" />
          </div>
          <div>
            <p className="mb-3 font-bebas text-lg tracking-widest text-white">
              NAVIGATE
            </p>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-barlow text-sm text-charcoal-light transition-colors hover:text-ember"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bebas text-lg tracking-widest text-white">
              FIND US
            </p>
            <div className="space-y-2">
              <p className="flex items-start gap-2 font-barlow text-sm text-charcoal-light">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                {siteConfig.address}
              </p>
              <p className="flex items-center gap-2 font-barlow text-sm text-charcoal-light">
                <Phone className="h-4 w-4 shrink-0 text-ember" />
                {siteConfig.phone}
              </p>
              <p className="flex items-center gap-2 font-barlow text-sm text-charcoal-light">
                <Mail className="h-4 w-4 shrink-0 text-ember" />
                {siteConfig.email}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-charcoal-light pt-6">
          <div className="mb-3 flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-barlow text-xs text-charcoal-light transition-colors hover:text-ember"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-center font-barlow text-xs text-charcoal-light">
            © {year} The Garrison, Barnsley. All rights reserved. Drink
            responsibly. 18+
          </p>
        </div>
      </Container>
    </footer>
  );
}
