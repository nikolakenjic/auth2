export function SectionHeader({title}: {title: string}) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 shrink-0">
                {title}
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    );
}
