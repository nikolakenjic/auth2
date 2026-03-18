import {SectionHeader} from './SectionHeader';

export function SummarySection({summary}: {summary: string}) {
    if (!summary?.trim()) return null;
    return (
        <section className="mb-7">
            <SectionHeader title="Summary" />
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </section>
    );
}
