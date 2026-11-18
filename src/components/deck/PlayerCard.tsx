"use client";

import Image from "next/image";

import { resetTilt, tilt } from "./tilt";

type PlayerCardProps = {
  name: string;
  initials: string;
  photo: string | null;
  photoAlt: string;
  rows: { label: string; value: string }[];
  status: string;
};

/** A collectible "player card" for the About section: photo, name and real facts; tilts with the pointer. */
export function PlayerCard({ name, initials, photo, photoAlt, rows, status }: PlayerCardProps) {
  return (
    <div onPointerMove={tilt} onPointerLeave={resetTilt} className="card mx-auto [--card-w:min(320px,78vw)]">
      <div className="card-float">
        <div className="card-tilt">
          <div className="card-inner">
            <div className="card-face card-front flex flex-col p-[0.9em]">
              <span className="card-frame" />
              <div className="flex items-center justify-between">
                <span className="foil font-display-wide text-[0.75em]">N·T</span>
                <span aria-hidden className="foil font-display-wide text-[0.75em]">A♠</span>
              </div>

              <div className="relative mt-[0.5em] aspect-[4/3.4] overflow-hidden rounded-[0.35em] border border-white/15 bg-[radial-gradient(circle_at_50%_35%,#262626,#0d0d0d)]">
                {photo ? (
                  <Image src={photo} alt={photoAlt} fill sizes="320px" className="object-cover" />
                ) : (
                  <span aria-hidden className="foil absolute inset-0 grid place-items-center font-display-wide text-[2.2em]">
                    {initials}
                  </span>
                )}
              </div>

              <p className="mt-[0.45em] font-display-wide text-[0.62em] uppercase leading-tight">{name}</p>
              <dl className="mt-[0.35em] space-y-[0.2em] font-mono text-[0.36em] uppercase tracking-[0.08em]">
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-[1em] border-b border-white/10 pb-[0.2em]">
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-auto flex items-center gap-[0.4em] font-mono text-[0.36em] uppercase tracking-[0.08em] text-accent">
                <span aria-hidden className="status-dot size-[0.6em] rounded-full bg-accent" />
                {status}
              </p>
              <span className="card-sheen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
