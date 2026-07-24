import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="About"
          title="Built around your schedule"
          description="Reliability, speed, and competitive pricing — with you as the top priority."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal>
            <p className="text-lg text-muted">{SITE.about}</p>
            <p className="mt-4 text-muted">
              From detailing and takeoff through fabrication, coatings, and
              delivery, we keep jobs moving with clear communication and
              shop-floor accountability.
            </p>
            <div className="mt-8">
              <Button href="#contact" magnetic>
                Work With Us
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="steel-sheen relative overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-graphite/80 p-6 shadow-[var(--shadow-soft)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-accent">
              <p className="font-display text-sm tracking-[0.18em] text-accent">
                Facility
              </p>
              <p className="mt-3 text-xl text-white">
                Full-service fabrication in {SITE.contact.facility}
              </p>
              <p className="mt-3 text-muted">
                Well situated to deliver steel efficiently across New York, New
                Jersey, and the tri-state area.
              </p>
              <p className="mt-6 text-sm text-steel">
                Head Office · {SITE.contact.address.full}
              </p>
            </aside>
          </Reveal>
        </div>

        <div className="mt-16 rounded-[var(--radius-lg)] border border-white/8 bg-ink/70 p-6 sm:p-10">
          <Reveal className="mb-10 max-w-xl">
            <h3 className="font-display text-3xl tracking-[0.08em] text-white">
              By the numbers
            </h3>
            <p className="mt-3 text-muted">
              A track record of delivery across airports, bridges, and urban
              construction.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            <StaggerItem>
              <div className="rounded-[var(--radius-md)] border border-white/10 bg-graphite/60 p-8">
                <p className="font-display text-6xl tracking-[0.04em] text-accent sm:text-7xl">
                  <CountUp end={SITE.yearEstablished} />
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
                  Year Established
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-[var(--radius-md)] border border-white/10 bg-graphite/60 p-8">
                <p className="font-display text-6xl tracking-[0.04em] text-white sm:text-7xl">
                  <CountUp end={SITE.projectsCompleted} suffix="+" />
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
                  Projects Completed
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
