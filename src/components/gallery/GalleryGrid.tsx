"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/data";

export function GalleryGrid() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduceMotion = useReducedMotion();
  const thumbRef = useRef<HTMLDivElement>(null);
  const total = GALLERY_IMAGES.length;
  const current = GALLERY_IMAGES[index];

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total],
  );

  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(id);
  }, [go, reduceMotion]);

  // Keep active thumb in view without scrolling the page (scrollIntoView was
  // jumping the viewport to #gallery whenever the slider advanced).
  useEffect(() => {
    const scroller = thumbRef.current;
    const el = scroller?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    if (!scroller || !el) return;
    const left =
      el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2;
    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index, reduceMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-graphite sm:aspect-[21/10]">
          <AnimatePresence mode="wait">
            <motion.button
              key={current.id}
              type="button"
              className="absolute inset-0 focus-ring"
              onClick={() => setLightbox(true)}
              aria-label={`Open image: ${current.alt}`}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index < 2}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20" />
            </motion.button>
          </AnimatePresence>

          <button
            type="button"
            className="focus-ring absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-sm)] border border-white/20 bg-charcoal/75 px-3 py-3 text-white backdrop-blur-sm sm:left-5"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="focus-ring absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-sm)] border border-white/20 bg-charcoal/75 px-3 py-3 text-white backdrop-blur-sm sm:right-5"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            →
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
            <p className="max-w-md text-sm text-steel-light sm:text-base">
              {current.alt}
            </p>
            <p className="shrink-0 font-display text-sm tracking-[0.18em] text-white">
              {String(index + 1).padStart(2, "0")}
              <span className="text-steel"> / {String(total).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        <div
          ref={thumbRef}
          className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Gallery thumbnails"
        >
          {GALLERY_IMAGES.map((image, i) => {
            const active = i === index;
            return (
              <button
                key={image.id}
                type="button"
                data-thumb={i}
                role="tab"
                aria-selected={active}
                aria-label={`Show image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`focus-ring relative h-16 w-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border transition-colors sm:h-20 sm:w-28 ${
                  active
                    ? "border-accent"
                    : "border-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/92 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              className="focus-ring absolute right-4 top-4 z-10 rounded-[var(--radius-sm)] border border-white/20 bg-graphite px-3 py-2 text-sm text-white"
              onClick={() => setLightbox(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="focus-ring absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-sm)] border border-white/20 bg-graphite px-3 py-3 text-white sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
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
                go(1);
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
                src={current.src}
                alt={current.alt}
                width={1600}
                height={1066}
                className="max-h-[85vh] w-full rounded-[var(--radius-md)] object-contain"
                sizes="100vw"
                priority
              />
              <p className="mt-3 text-center text-sm text-steel-light">
                {current.alt}
                <span className="ml-3 font-display tracking-[0.14em] text-steel">
                  {index + 1}/{total}
                </span>
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
