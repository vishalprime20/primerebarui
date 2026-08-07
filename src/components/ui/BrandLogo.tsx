"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/constants";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Transparent compressed logo (VP9 + alpha). */
const LOGO_VIDEO = `${BASE}/images/PrimeRebarAnimatedNewCompressedLogo.webm`;
const LOGO_POSTER = `${BASE}/images/prime-logo-poster.webp`;

const SIZE_STYLE: Record<"header" | "footer" | "hero", CSSProperties> = {
  header: { height: "2.75rem", width: "auto", maxWidth: "11rem" },
  footer: { height: "4rem", width: "auto", maxWidth: "16rem" },
  hero: {
    height: "clamp(5.5rem, 22vw, 11rem)",
    width: "auto",
    maxWidth: "min(100%, 36rem)",
  },
};

type BrandLogoProps = {
  className?: string;
  size?: keyof typeof SIZE_STYLE;
  priority?: boolean;
};

/** Animated transparent logo used in header, hero, and footer. */
export function BrandLogo({
  className = "",
  size = "header",
  priority = false,
}: BrandLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const play = () => {
      void video.play().catch(() => {});
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <span className={`inline-flex max-w-full leading-none ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_POSTER}
          alt={SITE.name}
          width={1650}
          height={800}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          style={SIZE_STYLE[size]}
          className="pointer-events-none select-none bg-transparent object-contain object-left"
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex max-w-full leading-none ${className}`}>
      <video
        ref={videoRef}
        src={LOGO_VIDEO}
        poster={LOGO_POSTER}
        width={1650}
        height={800}
        muted
        loop
        playsInline
        autoPlay
        preload={priority || size === "header" ? "auto" : "metadata"}
        aria-label={SITE.name}
        disablePictureInPicture
        controls={false}
        style={SIZE_STYLE[size]}
        className="pointer-events-none select-none bg-transparent object-contain object-left"
      />
    </span>
  );
}
