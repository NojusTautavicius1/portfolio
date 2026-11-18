export const container = "mx-auto w-full max-w-[1400px] px-5 md:px-10";

export const sectionSpacing = "py-[clamp(4.5rem,10vw,8rem)]";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium transition-[transform,background-color,border-color] duration-200 active:translate-y-px";

export const buttonPrimary = `${buttonBase} bg-accent-fill text-on-accent hover:brightness-110`;

export const buttonSecondary = `${buttonBase} border border-line text-text hover:border-muted`;

export const eyebrow = "font-mono text-xs uppercase tracking-[0.14em] text-muted";

export const sectionTitle = "text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]";
