"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Scribble } from "@/components/ui/Scribble";

/** Nav link to the project board; on the board itself it is struck through by hand, in red. */
export function BoardNavLink({ label, className = "" }: { label: string; className?: string }) {
  const active = usePathname() === "/projektai";

  return (
    <Link
      href="/projektai"
      aria-current={active ? "page" : undefined}
      className={`transition-colors hover:text-text ${active ? "text-text" : ""} ${className}`}
    >
      {active ? (
        <Scribble kind="strike" trigger="load" delay={0.2}>
          {label}
        </Scribble>
      ) : (
        label
      )}
    </Link>
  );
}
