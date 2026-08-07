import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

export function ContactSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.contact.address.full,
  )}&output=embed`;

  return (
    <section id="contact" className="relative z-10 scroll-mt-20 section-pad bg-ink/60">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contact"
          title="Request a quote"
          description="Tell us about your project — we’ll respond with pricing and lead times."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-fit rounded-[var(--radius-md)] border border-white/10 bg-graphite/80 p-6 sm:p-8">
              <p className="font-display text-sm tracking-[0.18em] text-accent">
                Head Office
              </p>
              <address className="mt-4 not-italic">
                <p className="font-display text-2xl tracking-[0.08em] text-white">
                  {SITE.contact.address.name}
                </p>
                <p className="mt-2 text-muted">{SITE.contact.address.line1}</p>
                <p className="text-muted">
                  {SITE.contact.address.city}, {SITE.contact.address.state}{" "}
                  {SITE.contact.address.zip}
                </p>
              </address>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-muted">
                <p>
                  <span className="block text-xs uppercase tracking-[0.16em] text-steel">
                    Contact
                  </span>
                  <span className="text-white">{SITE.contact.person}</span>
                </p>
                <p>
                  <span className="block text-xs uppercase tracking-[0.16em] text-steel">
                    Phone
                  </span>
                  <a
                    href={SITE.contact.phoneHref}
                    className="focus-ring text-accent hover:text-accent-hover"
                  >
                    {SITE.contact.phone}
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase tracking-[0.16em] text-steel">
                    Email
                  </span>
                  <a
                    href={SITE.contact.emailHref}
                    className="focus-ring text-accent hover:text-accent-hover"
                  >
                    {SITE.contact.email}
                  </a>
                </p>
              </div>

              <div className="mt-8 overflow-hidden rounded-[var(--radius-md)] border border-white/10">
                <iframe
                  title="Prime Rebar head office map"
                  src={mapSrc}
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
