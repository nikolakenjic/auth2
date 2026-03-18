export function BulletList({items}: {items: string[]}) {
    const filtered = items.filter((i) => i.trim());
    if (!filtered.length) return null;
    return (
        <ul className="mt-2 space-y-1.5">
            {filtered.map((item, i) => (
                <li
                    key={i}
                    className="text-sm text-gray-700 flex gap-2.5 leading-relaxed"
                >
                    <span className="text-gray-300 mt-0.5 shrink-0">▸</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
