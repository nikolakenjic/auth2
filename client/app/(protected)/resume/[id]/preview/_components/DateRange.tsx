export function DateRange({start, end}: {start?: string; end?: string}) {
    if (!start && !end) return null;
    return (
        <p className="text-xs text-gray-500 shrink-0 mt-1">
            {start} — {end || 'Present'}
        </p>
    );
}
