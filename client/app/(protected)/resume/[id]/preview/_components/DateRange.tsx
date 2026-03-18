function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    // Try to parse YYYY-MM or YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
        const date = new Date(`${parts[0]}-${parts[1]}-01`);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
            });
        }
    }
    return dateStr;
}

export function DateRange({start, end}: {start?: string; end?: string}) {
    if (!start && !end) return null;
    const formattedStart = formatDate(start);
    const formattedEnd = end ? formatDate(end) : 'Present';
    return (
        <p className="text-xs text-gray-400 shrink-0 mt-0.5 font-medium tabular-nums">
            {formattedStart} — {formattedEnd}
        </p>
    );
}
