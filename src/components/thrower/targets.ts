// Things on the page that react when a thrown card lands on them.
// Mark an element with data-egg="..." (or data-hero-card) to make it a target.

export type Reaction = "burst" | "jackpot" | null;

const knockLetter = (letter: HTMLElement) =>
  letter.animate(
    [
      { transform: "translateY(0) rotate(0deg)" },
      { transform: "translateY(0.55em) rotate(24deg)", offset: 0.22 },
      { transform: "translateY(0.55em) rotate(24deg)", offset: 0.78 },
      { transform: "translateY(0) rotate(0deg)" },
    ],
    { duration: 2600, easing: "cubic-bezier(0.3, 1.3, 0.5, 1)" },
  );

// Hit-testing by geometry instead of elementFromPoint: some targets have pointer-events: none.
function findTarget(x: number, y: number) {
  const hits = Array.from(document.querySelectorAll<HTMLElement>("[data-egg], [data-hero-card]"))
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);

  // The smallest box wins: a letter beats the heading it sits in.
  hits.sort((a, b) => a.rect.width * a.rect.height - b.rect.width * b.rect.height);
  return hits[0]?.element;
}

export function hit(x: number, y: number): Reaction {
  const target = findTarget(x, y);
  if (!target) return null;

  if (target.matches("[data-hero-card]")) {
    target.click();
    return null;
  }

  switch (target.dataset.egg) {
    case "letter":
      knockLetter(target);
      return null;
    case "status":
      return "burst";
    case "cv":
      return "jackpot";
    default:
      return null;
  }
}
