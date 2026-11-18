import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { container } from "@/lib/styles";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col gap-2 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{t("built")}</p>
      </div>
    </footer>
  );
}
