"use client";

import Image from "next/image";
import type { ReactNode } from "react";
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

const SERVICE_META = [
  {
    title: SERVICES[0].title,
    outcome: "Steel cut, bent, and bundled to spec — ready for the pour.",
    more: "#fabrication",
    icon: FabricationIcon,
  },
  {
    title: SERVICES[1].title,
    outcome: "Bending and crane handling for cages, mats, and heavy lifts.",
    more: "#fabrication",
    icon: CraneIcon,
  },
  {
    title: SERVICES[2].title,
    outcome: "Documented shop standards that match owner QA/QC.",
    more: "#contact",
    icon: QaIcon,
  },
  {
    title: SERVICES[3].title,
    outcome: "Tri-state delivery timed to the jobsite, not the week after.",
    more: "#contact",
    icon: TruckIcon,
  },
  {
    title: SERVICES[4].title,
    outcome: "Epoxy or galvanizing when the spec calls for corrosion protection.",
    more: "#fabrication",
    icon: CoatIcon,
  },
  {
    title: SERVICES[5].title,
    outcome: "Paint, dip, or specialty finish without a second vendor.",
    more: "#fabrication",
    icon: PaintIcon,
  },
] as const;

const DETAILING = new Set([
  "Rebar Detailing",
  "Rebar Takeoff",
  "Quality Shop drawings",
  "Quick Turnaround",
]);

const CAPABILITY_GROUPS = [
  {
    heading: "Detailing",
    items: FABRICATION_CAPABILITIES.filter((item) => DETAILING.has(item)),
  },
  {
    heading: "Fabrication",
    items: FABRICATION_CAPABILITIES.filter((item) => !DETAILING.has(item)),
  },
  {
    heading: "Coating",
    items: [SERVICES[4].title, SERVICES[5].title],
  },
] as const;

export function ServicesSection() {
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
          {SERVICES.map((service, i) => {
            const meta = SERVICE_META[i];
            const Icon = meta.icon;
            return (
              <StaggerItem key={service.title}>
                <TiltCard className="group flex h-full flex-col rounded-[var(--radius-md)] border border-black/10 bg-graphite/80 p-6 shadow-[var(--shadow-soft)]">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon />
                    <span className="font-display text-xs tracking-[0.2em] text-steel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-[0.08em] text-ink-text">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted">{meta.outcome}</p>
                  <a
                    href={meta.more}
                    className="focus-ring mt-auto pt-5 font-display text-sm tracking-[0.12em] text-accent hover:text-accent-hover"
                  >
                    Learn more
                  </a>
                </TiltCard>
              </StaggerItem>
            );
          })}
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

        <div id="fabrication" className="mt-16 scroll-mt-20">
          <SectionHeading
            eyebrow="Rebar fabrication"
            title="Dedicated fabrication"
            description="Specialized processes for complex specs, tight tolerances, and fast turnaround."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {CAPABILITY_GROUPS.map((group) => (
              <div key={group.heading}>
                <h3 className="font-display text-xl tracking-[0.1em] text-ink-text">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-[var(--radius-md)] border border-black/10 bg-charcoal/60 px-4 py-3 text-steel-light"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

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

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-black/10 bg-charcoal text-accent">
      {children}
    </span>
  );
}

function FabricationIcon() {
  return (
    <IconFrame>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 20 L12 4 L20 20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.5 14h9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </IconFrame>
  );
}

function CraneIcon() {
  return (
    <IconFrame>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 20h16M6 20V8h10l4 4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 8v12" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </IconFrame>
  );
}

function QaIcon() {
  return (
    <IconFrame>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 6h14v12H5z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </IconFrame>
  );
}

function TruckIcon() {
  return (
    <IconFrame>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 16V8h11v8H3z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 11h5l2 3v2h-7v-5z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7" cy="17" r="1.6" fill="currentColor" />
        <circle cx="17" cy="17" r="1.6" fill="currentColor" />
      </svg>
    </IconFrame>
  );
}

function CoatIcon() {
  return (
    <IconFrame>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 4h10v6c0 4-2.5 7-5 10-2.5-3-5-6-5-10V4z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </IconFrame>
  );
}

function PaintIcon() {
  return (
    <IconFrame>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 4h14l-2 7H7L5 4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 11v9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </IconFrame>
  );
}
