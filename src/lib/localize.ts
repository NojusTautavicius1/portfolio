import type { Localized } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function localize<T>(value: Localized<T>, locale: string): T {
  return value[locale as Locale] ?? value.lt;
}
