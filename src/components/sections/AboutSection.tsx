"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { ABOUT_IMAGES } from "@/lib/data";

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative z-10 scroll-mt-20 section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="About"
          title="Built around your schedule"
          description="Reliability, speed, and competitive pricing — with you as the top priority."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="text-lg text-muted">{SITE.about}</p>
            <p className="mt-4 text-lg text-muted">{SITE.aboutFacility}</p>
            <div className="mt-8">
              <Button href="#contact" magnetic>
                Work With Us
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-black/10 shadow-[var(--shadow-soft)]"
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <Image
                src={ABOUT_IMAGES.primary}
                alt="Prime Rebar fabrication shop floor"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-sm tracking-[0.18em] text-accent">
                  Facility
                </p>
                <p className="mt-2 text-xl text-white">
                  Full-service fabrication in {SITE.contact.facility}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-4 hidden w-[46%] overflow-hidden rounded-[var(--radius-md)] border border-black/15 shadow-[var(--shadow-soft)] sm:block"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              <div className="relative aspect-square">
                <Image
                  src={ABOUT_IMAGES.secondary}
                  alt="Detail of fabricated rebar"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </Reveal>
        </div>

        <div className="mt-20 overflow-hidden rounded-[var(--radius-lg)] border border-black/8 bg-ink/70">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[240px] lg:min-h-full">
              <Image
                src={ABOUT_IMAGES.stats}
                alt="Full-service fabrication facility"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/95 max-lg:bg-gradient-to-t max-lg:from-transparent max-lg:to-ink/95" />
            </div>
            <div className="p-6 sm:p-10">
              <Reveal className="mb-10 max-w-xl">
                <h3 className="font-display text-3xl tracking-[0.08em] text-ink-text">
                  By the numbers
                </h3>
                <p className="mt-3 text-muted">
                  A track record of delivery across airports, bridges, and urban
                  construction.
                </p>
              </Reveal>

              <Stagger className="grid gap-4 sm:grid-cols-2">
                <StaggerItem>
                  <div className="rounded-[var(--radius-md)] border border-black/10 bg-graphite/60 p-8">
                    <p className="font-display text-4xl tracking-[0.02em] text-accent whitespace-nowrap sm:text-5xl">
                      <CountUp end={SITE.yearEstablished} grouped={false} />
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
                      Year Established
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="rounded-[var(--radius-md)] border border-black/10 bg-graphite/60 p-8">
                    <p className="font-display text-4xl tracking-[0.02em] text-ink-text whitespace-nowrap sm:text-5xl">
                      <CountUp end={SITE.projectsCompleted} suffix="+" grouped={false} />
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
                      Projects Completed
                    </p>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
