import { getTranslations } from "next-intl/server";

import type { ProjectStatus } from "@/content/types";

const highlighted: ProjectStatus[] = ["client", "live"];

export async function StatusBadge({ status }: { status: ProjectStatus }) {
  const t = await getTranslations("status");
  const isHighlighted = highlighted.includes(status);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${isHighlighted ? "bg-accent" : "bg-muted"}`}
      />
      {t(status)}
    </span>
  );
}
