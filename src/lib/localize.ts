import type { Localized, Term } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function localize<T>(value: Localized<T>, locale: string): T {
  return value[locale as Locale] ?? value.lt;
}

export function localizeTerms(terms: Term[], locale: string): string[] {
  return terms.map((term) => (typeof term === "string" ? term : localize(term, locale)));
}
