"use client";

import { MAP_BOUNDS } from "@/lib/projectCoords";
import type { EnrichedProject } from "@/lib/projects";

type ProjectMapProps = {
  projects: EnrichedProject[];
  onSelect: (project: EnrichedProject) => void;
};

const W = 400;
const H = 460;

function toXY(lat: number, lng: number) {
  const x =
    ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * W;
  const y =
    (1 - (lat - MAP_BOUNDS.south) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * H;
  return { x, y };
}

export function ProjectMap({ projects, onSelect }: ProjectMapProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-black/10 bg-graphite">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Projects across New York City and New Jersey"
      >
        <rect width={W} height={H} fill="#ebe7df" />
        <path
          d="M42 70 C58 48 78 38 96 44 L118 78 C128 118 122 170 108 214 L86 268 C70 292 48 286 38 252 L28 168 Z"
          fill="#e4e0d8"
          stroke="#c8c2b6"
        />
        <text x="58" y="150" fill="#5c6570" fontSize="11" fontFamily="inherit">
          NJ
        </text>
        <path
          d="M168 48 C186 36 204 40 214 62 L220 150 C216 198 204 236 188 248 L170 232 C162 180 160 110 168 48 Z"
          fill="#d8d4cc"
          stroke="#b7b1a6"
        />
        <text x="176" y="140" fill="#3f4750" fontSize="10" fontFamily="inherit">
          Manhattan
        </text>
        <path
          d="M214 62 C248 48 292 58 318 86 L342 150 C348 188 330 214 292 228 L230 210 C218 168 216 110 214 62 Z"
          fill="#d8d4cc"
          stroke="#b7b1a6"
        />
        <text x="258" y="130" fill="#3f4750" fontSize="10" fontFamily="inherit">
          Bronx
        </text>
        <path
          d="M226 248 C268 236 318 244 352 278 L360 340 C340 372 286 386 236 368 L200 322 C198 286 208 258 226 248 Z"
          fill="#d8d4cc"
          stroke="#b7b1a6"
        />
        <text x="268" y="318" fill="#3f4750" fontSize="10" fontFamily="inherit">
          Queens
        </text>
        <path
          d="M148 258 C188 248 214 268 228 304 L210 368 C176 396 132 392 108 352 L118 292 Z"
          fill="#d8d4cc"
          stroke="#b7b1a6"
        />
        <text x="148" y="330" fill="#3f4750" fontSize="10" fontFamily="inherit">
          Brooklyn
        </text>
        <path
          d="M118 168 C146 158 168 176 176 214 L154 248 C126 252 104 228 108 196 Z"
          fill="#e4e0d8"
          stroke="#c8c2b6"
        />
        <text x="112" y="208" fill="#5c6570" fontSize="9" fontFamily="inherit">
          JC
        </text>
        <path
          d="M86 52 C112 40 128 52 132 78 L118 108 C96 112 78 90 86 52 Z"
          fill="#e4e0d8"
          stroke="#c8c2b6"
        />
        <text x="90" y="78" fill="#5c6570" fontSize="8" fontFamily="inherit">
          Hackensack
        </text>
        <path
          d="M132 70 C148 90 156 150 148 210"
          fill="none"
          stroke="#9aa3ad"
          strokeWidth="2"
        />

        {projects.map((project) => {
          if (!project.coords) return null;
          const { x, y } = toXY(project.coords.lat, project.coords.lng);
          return (
            <g key={project.id}>
              <title>{`${project.name} — ${project.location}`}</title>
              <circle
                cx={x}
                cy={y}
                r={project.featured ? 7 : 5}
                fill="#e85d04"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => onSelect(project)}
              />
            </g>
          );
        })}
      </svg>
      <p className="border-t border-black/8 px-4 py-3 text-xs text-steel">
        Schematic coverage map — {projects.length} pin
        {projects.length === 1 ? "" : "s"}. Click a pin for details.
      </p>
    </div>
  );
}
