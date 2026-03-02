import {SectionHeader} from './SectionHeader';

export function SkillsSection({skills}: {skills: string[]}) {
    const filtered = skills.filter((s) => s.trim());
    if (!filtered.length) return null;
    return (
        <section>
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap gap-2">
                {filtered.map((skill, i) => (
                    <span
                        key={i}
                        className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}
