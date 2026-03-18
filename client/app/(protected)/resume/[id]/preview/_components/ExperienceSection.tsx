import {getExperienceItems} from '@/app/lib/resume/resume.utils';
import {SectionHeader} from './SectionHeader';
import {BulletList} from './BulletList';
import {DateRange} from './DateRange';

type ExperienceItems = ReturnType<typeof getExperienceItems>;

export function ExperienceSection({experience}: {experience: ExperienceItems}) {
    if (!experience.length) return null;
    return (
        <section className="mb-7">
            <SectionHeader title="Experience" />
            <div className="space-y-6">
                {experience.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 leading-tight">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {item.company}
                                    {item.location ? (
                                        <span className="text-gray-400">
                                            {' '}
                                            · {item.location}
                                        </span>
                                    ) : null}
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
