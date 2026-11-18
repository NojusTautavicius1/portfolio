export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted">{children}</li>
  );
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
