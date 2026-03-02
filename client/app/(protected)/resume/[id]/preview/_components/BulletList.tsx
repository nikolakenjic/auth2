export function BulletList({items}: {items: string[]}) {
    const filtered = items.filter((i) => i.trim());
    if (!filtered.length) return null;
    return (
        <ul className="mt-2 space-y-1 list-disc list-inside">
            {filtered.map((item, i) => (
                <li key={i} className="text-sm">
                    {item}
                </li>
            ))}
        </ul>
    );
}
