import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { telHref, whatsappHref, formatBranchAddress } from "@/lib/format";

interface LinkItem {
  text: string;
  href?: string;
  external?: boolean;
}

interface Row {
  label: string;
  items: LinkItem[];
}

/**
 * Contact section (Document 2 §9). Entirely left aligned. Lists reachable
 * details and provides large Call + WhatsApp buttons. Phone and WhatsApp each
 * list BOTH showrooms' numbers (per-branch, from BRAND.branches). Rows with no
 * items are omitted so unconfigured fields (e.g. email) never render blank.
 * Each retail outlet is also listed as its own address row (linked to its map).
 *
 * Desktop width: the outer container-lux spans the standard 1280px content
 * width (same left gutter as every other section); the inner max-w-4xl
 * wrapper is left aligned (no mx-auto) so the details sit at the site's left
 * edge and read wider instead of floating narrow in the centre. Mobile is
 * unchanged (container padding still governs the width below 896px).
 */
export function Contact() {
  const phoneItems: LinkItem[] = BRAND.branches.map((branch) => ({
    text: `${branch.area}: ${branch.phone}`,
    href: telHref(branch.phone),
  }));

  const whatsappItems: LinkItem[] = BRAND.branches.map((branch) => ({
    text: `${branch.area}: ${branch.phone}`,
    href: whatsappHref(branch.phone, BRAND.whatsappMessage),
    external: true,
  }));

  const rows: Row[] = [
    { label: "Business", items: [{ text: BRAND.businessName }] },
    { label: "Phone", items: phoneItems },
    { label: "WhatsApp", items: whatsappItems },
    ...(BRAND.email
      ? [
          {
            label: "Email",
            items: [{ text: BRAND.email, href: `mailto:${BRAND.email}` }],
          },
        ]
      : []),
    {
      label: "Instagram",
      items: [
        {
          text: "@hayazgoldanddiamonds",
          href: BRAND.instagram,
          external: true,
        },
      ],
    },
    {
      label: "Facebook",
      items: [
        { text: "facebook.com/hayazgold", href: BRAND.facebook, external: true },
      ],
    },
    { label: "Opening Hours", items: [{ text: BRAND.openingHours }] },
    ...BRAND.branches.map((branch) => ({
      label: `${branch.area} Store`,
      items: [
        {
          text: `${branch.name}, ${formatBranchAddress(branch)}`,
          href: branch.mapsLink,
          external: true,
        },
      ],
    })),
  ].filter((row) => row.items.length > 0);

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-lux">
        <div className="max-w-4xl">
          <Reveal>
            <SectionHeading eyebrow="Get In Touch" title="Contact" align="left" />

            <dl className="mt-10 divide-y divide-border border-t border-border">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="w-40 shrink-0 font-sans text-caption uppercase tracking-[0.14em] text-muted">
                    {row.label}
                  </dt>
                  <dd className="flex flex-col gap-1 font-sans text-body text-ivory">
                    {row.items.map((item, index) =>
                      item.href ? (
                        <a
                          key={index}
                          href={item.href}
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="transition-colors duration-300 hover:text-gold"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span key={index}>{item.text}</span>
                      ),
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href={telHref(BRAND.phone)}
                variant="primary"
                className="w-full sm:w-auto"
              >
                Call {BRAND.businessName}
              </Button>
              <Button
                href={whatsappHref(BRAND.whatsapp, BRAND.whatsappMessage)}
                external
                variant="secondary"
                className="w-full sm:w-auto"
              >
                WhatsApp Us
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
