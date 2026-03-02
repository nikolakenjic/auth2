export function SectionHeader({title}: {title: string}) {
    return (
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 border-b mb-3">
            {title}
        </h2>
    );
}
