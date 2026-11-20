// First sentence of a text. With `colon` (tight spots like the board) it also stops at a colon,
// which then becomes a period.
export function firstSentence(text: string, { colon = true } = {}) {
  const end = text.search(colon ? /[.:](\s|$)/ : /\.(\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1).replace(/:$/, ".");
}
