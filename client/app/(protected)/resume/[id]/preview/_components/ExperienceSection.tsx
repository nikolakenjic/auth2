import {getExperienceItems} from '@/app/lib/resume/resume.utils';
import {SectionHeader} from './SectionHeader';
import {BulletList} from './BulletList';
import {DateRange} from './DateRange';

type ExperienceItems = ReturnType<typeof getExperienceItems>;

export function ExperienceSection({experience}: {experience: ExperienceItems}) {
    if (!experience.length) return null;
    return (
        <section className="mb-6">
            <SectionHeader title="Experience" />
            <div className="space-y-5">
                {experience.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">{item.title}</p>
                                <p className="text-sm text-gray-600">
                                    {item.company}
                                    {item.location ? ` — ${item.location}` : ''}
                                </p>
                            </div>
                            <DateRange
                                start={item.startDate}
                                end={item.endDate}
                            />
                        </div>
                        <BulletList items={item.bullets} />
                    </div>
                ))}
            </div>
        </section>
    );
}
