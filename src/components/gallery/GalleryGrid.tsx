"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/data";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const active =
    activeIndex !== null ? GALLERY_IMAGES[activeIndex] : undefined;

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i + 1) % GALLERY_IMAGES.length,
    );
  }, []);
  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null
        ? i
        : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  return (
    <>
      <Stagger className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {GALLERY_IMAGES.map((image, index) => (
          <StaggerItem key={image.id} className="mb-4 break-inside-avoid">
            <motion.button
              type="button"
              className="focus-ring group relative block w-full overflow-hidden rounded-[var(--radius-md)] border border-white/10"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image: ${image.alt}`}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={index % 3 === 0 ? 1000 : 640}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-display text-xs tracking-[0.18em] text-accent">
                  View
                </span>
              </span>
            </motion.button>
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/92 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              className="focus-ring absolute right-4 top-4 z-10 rounded-[var(--radius-sm)] border border-white/20 bg-graphite px-3 py-2 text-sm text-white"
              onClick={close}
            >
              Close
            </button>
            <button
              type="button"
              className="focus-ring absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-sm)] border border-white/20 bg-graphite px-3 py-3 text-white sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              className="focus-ring absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-sm)] border border-white/20 bg-graphite px-3 py-3 text-white sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              →
            </button>

            <motion.div
              className="relative max-h-[85vh] w-full max-w-5xl"
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={1600}
                height={1066}
                className="max-h-[85vh] w-full rounded-[var(--radius-md)] object-contain"
                sizes="100vw"
                priority
              />
              <p className="mt-3 text-center text-sm text-steel-light">
                {active.alt}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
