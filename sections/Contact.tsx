import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { telHref, formatBranchAddress } from "@/lib/format";

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
 * Contact section (Document 2 §9). Entirely left aligned. Reachable details are
 * shown as an aligned label/value list: Phone lists BOTH showrooms' numbers
 * (per-branch, from BRAND.branches) and each retail outlet is listed as its own
 * address row (linked to its map). Instagram, WhatsApp and Facebook render as
 * gold app-icon tiles (SocialLinks) that open each profile in a new tab. Rows
 * with no items are omitted so unconfigured fields (e.g. email) never render
 * blank.
 *
 * Desktop width: the outer container-lux spans the standard 1280px content
 * width (same left gutter as every other section); the inner max-w-4xl wrapper
 * is left aligned (no mx-auto) so the details sit at the site's left edge and
 * read wider instead of floating narrow in the centre. Mobile is unchanged.
 */
export function Contact() {
  const phoneItems: LinkItem[] = BRAND.branches.map((branch) => ({
    text: `${branch.area}: ${branch.phone}`,
    href: telHref(branch.phone),
  }));

  const rows: Row[] = [
    { label: "Business", items: [{ text: BRAND.businessName }] },
    { label: "Phone", items: phoneItems },
    ...(BRAND.email
      ? [
          {
            label: "Email",
            items: [{ text: BRAND.email, href: `mailto:${BRAND.email}` }],
          },
        ]
      : []),
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

            <SocialLinks className="mt-10" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
