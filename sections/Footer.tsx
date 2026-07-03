import { BRAND } from "@/config/brand";
import { telHref, whatsappHref, formatBranchAddress } from "@/lib/format";

/**
 * Footer quick links. Mirrors the primary journey and the Hero CTAs, so the
 * standalone Schemes and Offers pages are reachable from the footer too.
 */
const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Visit Store", href: "#visit-store" },
  { label: "Schemes", href: "/schemes" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "#contact" },
];

/**
 * Footer (Document 2 §12): brand, tagline, quick links, and a per-outlet
 * contact block (name, address and that outlet's own phone number) plus social
 * links. Minimal, no unnecessary content.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-16">
      <div className="container-lux grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-ivory">{BRAND.businessName}</p>
          <p className="mt-3 max-w-xs font-sans text-body text-muted">
            {BRAND.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-sans text-caption uppercase tracking-[0.14em] text-muted">
            Quick Links
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-body text-ivory transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-sans text-caption uppercase tracking-[0.14em] text-muted">
            Contact
          </p>
          <ul className="mt-4 flex flex-col gap-6 font-sans text-body">
            {BRAND.branches.map((branch) => (
              <li key={branch.name} className="max-w-xs">
                <span className="block text-ivory">{branch.name}</span>
                <span className="mt-1 block text-muted">
                  {formatBranchAddress(branch)}
                </span>
                <a
                  href={telHref(branch.phone)}
                  className="mt-1 block text-ivory transition-colors duration-300 hover:text-gold"
                >
                  {branch.phone}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-4">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND.businessName} on Instagram`}
              className="font-sans text-body text-muted transition-colors duration-300 hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND.businessName} on Facebook`}
              className="font-sans text-body text-muted transition-colors duration-300 hover:text-gold"
            >
              Facebook
            </a>
            <a
              href={whatsappHref(BRAND.whatsapp, BRAND.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND.businessName} on WhatsApp`}
              className="font-sans text-body text-muted transition-colors duration-300 hover:text-gold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container-lux mt-12 border-t border-border pt-8">
        <p className="font-sans text-caption text-muted">
          © {year} {BRAND.businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
