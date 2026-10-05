"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

/**
 * Paste your public Spline scene URL here (Share → Public URL / .splinecode),
 * or set NEXT_PUBLIC_SPLINE_SCENE_URL in the environment.
 */
export const SPLINE_SCENE_URL =
  process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ??
  "[PASTE YOUR SPLINE URL HERE]";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineSkeleton />,
});

function SplineSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1c2026] to-black" />
      <div
        className="absolute inset-[12%] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(232,93,4,0.22), transparent 62%)",
        }}
      />
      <div
        className="absolute inset-[18%] animate-pulse rounded-[2rem] border border-steel/10 bg-steel/5"
        style={{
          boxShadow: "inset 0 0 80px rgba(208,214,220,0.06)",
        }}
      />
      <div className="absolute inset-x-[28%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-steel/25 to-transparent" />
    </div>
  );
}

type SplineHeroSceneProps = {
  className?: string;
  sceneUrl?: string;
};

/**
 * Lightweight Spline viewer for the hero — right-split desktop, full-bleed mobile.
 */
export function SplineHeroScene({
  className = "",
  sceneUrl = SPLINE_SCENE_URL,
}: SplineHeroSceneProps) {
  const [ready, setReady] = useState(false);
  const hasValidUrl =
    Boolean(sceneUrl) &&
    !sceneUrl.includes("[PASTE YOUR SPLINE URL HERE]") &&
    sceneUrl.startsWith("http");

  return (
    <div className={`relative h-full w-full ${className}`} aria-hidden>
      {!ready && hasValidUrl && <SplineSkeleton />}

      {hasValidUrl ? (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Spline
            scene={sceneUrl}
            onLoad={() => setReady(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </div>
  );
}
