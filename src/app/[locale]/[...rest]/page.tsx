import { notFound } from "next/navigation";

// Unknown paths inside /lt or /en: show the localized 404 instead of Next's default page.
export default function CatchAll() {
  notFound();
}
