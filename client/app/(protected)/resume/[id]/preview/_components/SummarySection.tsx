import {SectionHeader} from './SectionHeader';

export function SummarySection({summary}: {summary: string}) {
    if (!summary) return null;
    return (
        <section className="mb-6">
            <SectionHeader title="Summary" />
            <p className="text-sm leading-relaxed">{summary}</p>
        </section>
    );
}
