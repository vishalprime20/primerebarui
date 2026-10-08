"use client";

import Link from "next/link";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { sectionIdFromHash } from "@/lib/projects";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export function Header() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduceMotion = useReducedMotion();
  const navId = useId();

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = sectionIdFromHash(hash);
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "auto" });
      setActive(id);
    });
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);
  const lightBar = open || !heroVisible;

  const scrollToHash = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = sectionIdFromHash(href);
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    if (id === "home") {
      window.scrollTo({ top: 0, behavior });
      window.history.replaceState(null, "", "#home");
      setActive("home");
      closeMenu();
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior });
      window.history.replaceState(null, "", href);
      setActive(id);
    }
    closeMenu();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        lightBar
          ? "border-b border-black/10 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link
          href="#home"
          className="focus-ring drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]"
          aria-label={`${SITE.name} home`}
          onClick={(e) => scrollToHash(e, "#home")}
        >
          <BrandLogo size="header" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                className={`focus-ring relative rounded-[var(--radius-sm)] px-3 py-2 text-sm tracking-wide transition-colors ${
                  lightBar
                    ? isActive
                      ? "text-ink-text"
                      : "text-steel hover:text-ink-text"
                    : "!text-[#ffffff] drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)] hover:!text-[#ffffff]"
                }`}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId={reduceMotion ? undefined : "nav-indicator"}
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" className="!py-2.5 !px-4">
            Request a Quote
          </Button>
        </div>

        <button
          type="button"
          className={`focus-ring relative z-50 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border lg:hidden ${
            lightBar
              ? "border-black/15 text-ink-text"
              : "border-white/40 !text-[#ffffff]"
          }`}
          aria-expanded={open}
          aria-controls={navId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full transition-transform ${
                lightBar ? "bg-ink-text" : "bg-[#ffffff]"
              } ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full transition-opacity ${
                lightBar ? "bg-ink-text" : "bg-[#ffffff]"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full transition-transform ${
                lightBar ? "bg-ink-text" : "bg-[#ffffff]"
              } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id={navId}
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            className="border-t border-black/10 bg-white/98 lg:hidden"
            aria-label="Mobile"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToHash(e, link.href)}
                    className={`focus-ring rounded-[var(--radius-sm)] px-3 py-3 font-display tracking-[0.12em] ${
                      isActive ? "bg-black/5 text-accent" : "text-ink-text"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-3 px-1 pb-2">
                <Button href="#contact" className="w-full" onClick={closeMenu}>
                  Request a Quote
                </Button>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
