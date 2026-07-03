import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";

/**
 * "Journey Towards Goal" — Vision 2035 milestones.
 *
 * Full-width stats band that replaced the former third story chapter, so it
 * uses the video's space too. Content is config-driven from BRAND.visionGoal
 * and reuses the same gold display styling as the "Vision" chapter heading.
 *
 * Responsive: on laptop the five stats sit in one centered row separated by
 * vertical dividers (matching the reference); on mobile they stack vertically
 * with horizontal dividers so nothing is cramped.
 */
export function VisionGoal() {
  const { title, subtitle, stats } = BRAND.visionGoal;

  return (
    <section className="py-24 md:py-32">
      <div className="container-lux">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display text-display-l font-bold tracking-tight text-gold">
              {title}
            </h2>
            <p className="mt-3 font-display text-display-m text-gold">{subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mx-auto mt-12 flex max-w-4xl flex-col divide-y divide-border md:mt-16 md:flex-row md:justify-center md:divide-x md:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 px-5 py-5 text-center md:py-2"
              >
                <dt className="whitespace-nowrap font-display text-2xl font-bold text-gold">
                  {stat.value}
                </dt>
                <dd className="max-w-[9rem] font-sans text-caption uppercase tracking-[0.15em] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
