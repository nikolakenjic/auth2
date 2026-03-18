import {getEducationItems} from '@/app/lib/resume/resume.utils';
import {SectionHeader} from './SectionHeader';
import {BulletList} from './BulletList';
import {DateRange} from './DateRange';

type EducationItems = ReturnType<typeof getEducationItems>;

export function EducationSection({education}: {education: EducationItems}) {
    if (!education.length) return null;
    return (
        <section className="mb-7">
            <SectionHeader title="Education" />
            <div className="space-y-5">
                {education.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 leading-tight">
                                    {item.school}
                                </p>
                                {(item.degree || item.field) && (
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {[item.degree, item.field]
                                            .filter(Boolean)
                                            .join(' in ')}
                                    </p>
                                )}
                            </div>
                            <DateRange
                                start={item.startDate}
                                end={item.endDate}
                            />
                        </div>
                        <BulletList items={item.details} />
                    </div>
                ))}
            </div>
        </section>
    );
}
