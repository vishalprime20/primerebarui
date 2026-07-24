"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent, RefObject } from "react";
import { useRef, useState } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  magnetic?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  disabled?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[0_10px_30px_rgba(232,93,4,0.28)]",
  secondary:
    "border border-steel/40 bg-white/5 text-white hover:border-steel-light/60 hover:bg-white/10",
  ghost: "text-steel-light hover:text-white",
};

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function isHashHref(href: string) {
  return href.startsWith("#");
}

export function Button(props: ButtonProps) {
  const {
    children,
    className = "",
    variant = "primary",
    magnetic = false,
    onClick,
  } = props;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 py-3.5 font-display text-sm tracking-[0.12em] transition-colors duration-300 will-change-transform";

  const classes = `${base} ${variants[variant]} ${className}`;

  const onMove = (e: MouseEvent) => {
    if (!magnetic || reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.22, y: y * 0.22 });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  const motionStyle = magnetic ? { x: offset.x, y: offset.y } : undefined;

  const handleHashClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!props.href || !isHashHref(props.href)) {
      onClick?.();
      return;
    }
    e.preventDefault();
    const id = props.href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      window.history.replaceState(null, "", props.href);
    }
    onClick?.();
  };

  if (props.href) {
    if (isHashHref(props.href)) {
      return (
        <motion.span
          style={motionStyle}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="inline-flex"
        >
          <a
            ref={ref as RefObject<HTMLAnchorElement>}
            href={props.href}
            className={classes}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={handleHashClick}
          >
            {children}
          </a>
        </motion.span>
      );
    }

    return (
      <motion.span
        style={motionStyle}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="inline-flex"
      >
        {isInternalHref(props.href) ? (
          <Link
            ref={ref as RefObject<HTMLAnchorElement>}
            href={props.href}
            className={classes}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={onClick}
          >
            {children}
          </Link>
        ) : (
          <a
            ref={ref as RefObject<HTMLAnchorElement>}
            href={props.href}
            className={classes}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={onClick}
          >
            {children}
          </a>
        )}
      </motion.span>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={props.type ?? "button"}
      disabled={props.disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
      style={motionStyle}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
