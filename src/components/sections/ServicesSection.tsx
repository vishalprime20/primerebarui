"use client";

import { useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/motion/TiltCard";
import { FABRICATION_CAPABILITIES, SERVICES } from "@/lib/data";

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative z-10 scroll-mt-24 section-pad">
      <div className="absolute inset-0 metal-gradient opacity-60" aria-hidden />
      <div className="absolute inset-0 metal-grid opacity-25" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Services"
          title="What we deliver"
          description="Full-service rebar fabrication, coatings, quality control, and tri-state transportation."
        />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <StaggerItem key={service.title}>
              <TiltCard className="group h-full steel-sheen rounded-[var(--radius-md)] border border-white/10 bg-graphite/80 p-6 shadow-[var(--shadow-soft)]">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-px w-12 bg-accent transition-all duration-500 group-hover:w-20" />
                  <span className="font-display text-xs tracking-[0.2em] text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-[0.08em] text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted">{service.description}</p>
                <div
                  className="mt-6 h-10 w-full rounded-sm opacity-40 transition-opacity group-hover:opacity-70"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(154,163,173,0.2), transparent)",
                    transform: reduceMotion ? undefined : "skewX(-12deg)",
                  }}
                  aria-hidden
                />
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Shop capabilities"
            title="Dedicated fabrication"
            description="Specialized processes for complex specs, tight tolerances, and fast turnaround."
          />

          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FABRICATION_CAPABILITIES.map((item) => (
              <StaggerItem key={item}>
                <TiltCard className="group flex h-full items-start gap-3 rounded-[var(--radius-md)] border border-white/10 bg-charcoal/60 px-4 py-4 transition-colors hover:border-accent/40">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(232,93,4,0.55)]"
                    aria-hidden
                  />
                  <p className="text-steel-light transition-colors group-hover:text-white">
                    {item}
                  </p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12">
            <Button href="#contact" magnetic>
              Request a Quote
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
