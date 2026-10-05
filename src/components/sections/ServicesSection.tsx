"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  ABOUT_IMAGES,
  FABRICATION_CAPABILITIES,
  SERVICE_IMAGES,
  SERVICES,
} from "@/lib/data";

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative z-10 scroll-mt-20 section-pad">
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
              <TiltCard className="group h-full steel-sheen rounded-[var(--radius-md)] border border-black/10 bg-graphite/80 p-6 shadow-[var(--shadow-soft)]">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-px w-12 bg-accent transition-all duration-500 group-hover:w-20" />
                  <span className="font-display text-xs tracking-[0.2em] text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-[0.08em] text-ink-text">
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

        <Reveal className="mt-10 grid gap-3 sm:grid-cols-3">
          {SERVICE_IMAGES.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-black/10"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Rebar fabrication"
            title="Dedicated fabrication"
            description="Specialized processes for complex specs, tight tolerances, and fast turnaround."
          />

          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FABRICATION_CAPABILITIES.map((item) => (
              <StaggerItem key={item}>
                <TiltCard className="group flex h-full items-start gap-3 rounded-[var(--radius-md)] border border-black/10 bg-charcoal/60 px-4 py-4 transition-colors hover:border-accent/40">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(232,93,4,0.55)]"
                    aria-hidden
                  />
                  <p className="text-steel-light transition-colors group-hover:text-ink-text">
                    {item}
                  </p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-black/10">
                <Image
                  src={ABOUT_IMAGES.detailing}
                  alt="Suspended slab residential rebar detailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-sm tracking-[0.22em] text-accent">
                Rebar detailing
              </p>
              <h3 className="mt-3 font-display text-3xl tracking-[0.08em] text-ink-text sm:text-4xl">
                Detailing & takeoff that keep jobs moving
              </h3>
              <p className="mt-4 max-w-lg text-muted">
                Quality shop drawings, rebar takeoff, and quick turnaround —
                coordinated with fabrication so steel arrives ready for the
                jobsite.
              </p>
              <div className="mt-8">
                <Button href="#contact" magnetic>
                  Request a Quote
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
