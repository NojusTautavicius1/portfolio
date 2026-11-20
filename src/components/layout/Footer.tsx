import { getTranslations } from "next-intl/server";

import { ConsentSettingsButton } from "@/components/analytics/ConsentSettingsButton";
import { profile } from "@/content/profile";
import { GA_ID } from "@/lib/consent";
import { container } from "@/lib/styles";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-line print:hidden">
      <div
        className={`${container} flex flex-col gap-2 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between`}
      >
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          {GA_ID && (
            <>
              <ConsentSettingsButton label={t("cookies")} />
              <span aria-hidden> · </span>
            </>
          )}
          {t("built")}{" "}
          <a
            href={profile.repo}
            target="_blank"
            rel="noopener"
            className="text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {t("source")} ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
