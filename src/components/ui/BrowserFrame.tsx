// Screenshot inside a plain browser window, with the site's address when it has one.
export function BrowserFrame({ host, children }: { host: string | null; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line px-4">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        {host && <span className="ml-3 truncate font-mono text-[11px] text-muted">{host}</span>}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
