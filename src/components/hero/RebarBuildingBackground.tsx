"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Col = {
  x: number;
  floors: number;
  width: number;
  tilt: number;
};

function buildColumns(count: number): Col[] {
  const cols: Col[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    cols.push({
      x: 0.06 + t * 0.88,
      floors: 4 + Math.round(Math.sin(t * Math.PI) * 5 + t * 6),
      width: 0.028 + (i % 3) * 0.004,
      tilt: (i % 2 === 0 ? -1 : 1) * 0.008,
    });
  }
  return cols;
}

function drawRebar(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness: number,
  color: string,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Ridge ticks along the bar
  const len = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.max(2, Math.floor(len / 14));
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  ctx.lineWidth = Math.max(1, thickness * 0.55);
  ctx.strokeStyle = "rgba(60,66,72,0.85)";
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;
    ctx.beginPath();
    ctx.moveTo(px - nx * thickness * 0.9, py - ny * thickness * 0.9);
    ctx.lineTo(px + nx * thickness * 0.9, py + ny * thickness * 0.9);
    ctx.stroke();
  }
}

export function RebarBuildingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const progressRef = useRef(reduceMotion ? 0.72 : 0.12);
  const targetRef = useRef(reduceMotion ? 0.72 : 0.12);
  const pointerXRef = useRef(0.2);
  const rafRef = useRef(0);
  const colsRef = useRef(buildColumns(14));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (clientX: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      pointerXRef.current = x;
      // Building constructs from left → right up to cursor
      targetRef.current = reduceMotion ? 0.72 : 0.04 + x * 0.96;
    };

    const onMove = (e: PointerEvent) => onPointer(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) onPointer(e.touches[0].clientX);
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: w, height: h } = parent.getBoundingClientRect();
      if (w < 2 || h < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Smooth follow
      progressRef.current +=
        (targetRef.current - progressRef.current) * (reduceMotion ? 1 : 0.08);
      const progress = progressRef.current;
      const edgeX = progress * w;

      ctx.clearRect(0, 0, w, h);

      // Atmosphere
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#0c1824");
      sky.addColorStop(0.55, "#141618");
      sky.addColorStop(1, "#1a1e22");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Soft orange wash near construction edge
      const glow = ctx.createRadialGradient(
        edgeX,
        h * 0.45,
        20,
        edgeX,
        h * 0.45,
        w * 0.35,
      );
      glow.addColorStop(0, "rgba(232,93,4,0.18)");
      glow.addColorStop(1, "rgba(232,93,4,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const groundY = h * 0.88;
      const baseY = h * 0.9;

      // Ground plate
      ctx.fillStyle = "rgba(10,12,14,0.65)";
      ctx.fillRect(0, groundY, w, h - groundY);
      ctx.strokeStyle = "rgba(154,163,173,0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(Math.min(w, edgeX + 40), groundY);
      ctx.stroke();

      const cols = colsRef.current;
      const floorH = h * 0.07;

      cols.forEach((col, colIndex) => {
        const colCenter = col.x * w;
        // Only draw columns that start before the progress edge
        if (colCenter - 20 > edgeX) return;

        const reveal = Math.min(
          1,
          Math.max(0, (edgeX - (colCenter - w * 0.08)) / (w * 0.12)),
        );
        if (reveal <= 0.02) return;

        const maxFloors = col.floors;
        const visibleFloors = Math.max(1, Math.ceil(maxFloors * reveal));
        const barT = Math.max(2.2, col.width * w * 0.35);
        const left = colCenter - col.width * w * 0.5;
        const right = colCenter + col.width * w * 0.5;
        const topY = groundY - visibleFloors * floorH * reveal;

        // Vertical rebars (4 per column bay)
        const verts = [left, left + (right - left) * 0.33, left + (right - left) * 0.66, right];
        verts.forEach((vx, vi) => {
          const sway = Math.sin(colIndex + vi) * col.tilt * h;
          drawRebar(
            ctx,
            vx + sway,
            groundY,
            vx - sway * 0.3,
            topY,
            barT,
            vi % 2 === 0 ? "#b8c0c8" : "#8e98a3",
          );
          // Orange tip at top (active build)
          ctx.fillStyle = "#e85d04";
          ctx.beginPath();
          ctx.arc(vx - sway * 0.3, topY, barT * 0.7, 0, Math.PI * 2);
          ctx.fill();
        });

        // Floor ties / stirrups
        for (let f = 1; f <= visibleFloors; f++) {
          const fy = groundY - f * floorH * reveal;
          if (fy < topY - 2) continue;
          drawRebar(ctx, left - 4, fy, right + 4, fy, barT * 0.75, "#9aa3ad");

          // Cross bracing on alternate floors
          if (f % 2 === 0) {
            drawRebar(
              ctx,
              left,
              fy,
              right,
              fy - floorH * 0.85 * reveal,
              1.6,
              "rgba(154,163,173,0.55)",
            );
            drawRebar(
              ctx,
              right,
              fy,
              left,
              fy - floorH * 0.85 * reveal,
              1.6,
              "rgba(154,163,173,0.45)",
            );
          }
        }

        // Cage rectangles fading in
        ctx.strokeStyle = `rgba(208,214,220,${0.12 + reveal * 0.2})`;
        ctx.lineWidth = 1;
        for (let f = 0; f < visibleFloors; f++) {
          const y1 = groundY - (f + 1) * floorH * reveal;
          const y2 = groundY - f * floorH * reveal;
          ctx.strokeRect(left - 2, y1, right - left + 4, y2 - y1);
        }
      });

      // Beams connecting neighboring revealed columns
      for (let i = 0; i < cols.length - 1; i++) {
        const a = cols[i];
        const b = cols[i + 1];
        const ax = a.x * w;
        const bx = b.x * w;
        if (bx > edgeX + 10) continue;
        const floors = Math.min(a.floors, b.floors);
        const reveal = Math.min(1, Math.max(0, (edgeX - ax) / (w * 0.15)));
        const visible = Math.ceil(floors * reveal * 0.7);
        for (let f = 1; f <= visible; f++) {
          const fy = groundY - f * floorH * reveal;
          drawRebar(ctx, ax, fy, bx, fy, 2, "rgba(154,163,173,0.5)");
        }
      }

      // Construction frontier line at cursor
      const pulse = 0.5 + Math.sin(performance.now() / 280) * 0.5;
      ctx.save();
      ctx.strokeStyle = `rgba(232,93,4,${0.35 + pulse * 0.45})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(edgeX, h * 0.08);
      ctx.lineTo(edgeX, groundY + 8);
      ctx.stroke();
      ctx.setLineDash([]);

      // Frontier glow bar
      const edgeGlow = ctx.createLinearGradient(edgeX - 40, 0, edgeX + 40, 0);
      edgeGlow.addColorStop(0, "rgba(232,93,4,0)");
      edgeGlow.addColorStop(0.5, `rgba(232,93,4,${0.12 + pulse * 0.1})`);
      edgeGlow.addColorStop(1, "rgba(232,93,4,0)");
      ctx.fillStyle = edgeGlow;
      ctx.fillRect(edgeX - 40, 0, 80, groundY);

      // Cursor marker
      const mx = pointerXRef.current * w;
      ctx.fillStyle = "rgba(232,93,4,0.9)";
      ctx.beginPath();
      ctx.arc(mx, groundY + 14, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Left dim mask (unbuilt zone)
      if (progress < 0.98) {
        const mist = ctx.createLinearGradient(edgeX, 0, Math.min(w, edgeX + w * 0.25), 0);
        mist.addColorStop(0, "rgba(20,22,24,0)");
        mist.addColorStop(1, "rgba(20,22,24,0.55)");
        ctx.fillStyle = mist;
        ctx.fillRect(edgeX, 0, w - edgeX, h);
      }

      // Vignette for text readability on left
      const vig = ctx.createLinearGradient(0, 0, w * 0.55, 0);
      vig.addColorStop(0, "rgba(20,22,24,0.72)");
      vig.addColorStop(0.55, "rgba(20,22,24,0.25)");
      vig.addColorStop(1, "rgba(20,22,24,0)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w * 0.55, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
