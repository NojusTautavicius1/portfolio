// Like requestIdleCallback, with a timeout fallback. Returns a cancel function.
export function whenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 300);
  return () => clearTimeout(id);
}
