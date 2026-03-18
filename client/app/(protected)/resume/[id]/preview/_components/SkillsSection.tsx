import {SectionHeader} from './SectionHeader';

export function SkillsSection({skills}: {skills: string[]}) {
    const filtered = skills.filter((s) => s.trim());
    if (!filtered.length) return null;
    return (
        <section className="mb-7">
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap gap-2">
                {filtered.map((skill, i) => (
                    <span
                        key={i}
                        className="text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}
