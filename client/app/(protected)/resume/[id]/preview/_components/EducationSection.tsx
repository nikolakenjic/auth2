import {getEducationItems} from '@/app/lib/resume/resume.utils';
import {SectionHeader} from './SectionHeader';
import {BulletList} from './BulletList';
import {DateRange} from './DateRange';

type EducationItems = ReturnType<typeof getEducationItems>;

export function EducationSection({education}: {education: EducationItems}) {
    if (!education.length) return null;
    return (
        <section className="mb-6">
            <SectionHeader title="Education" />
            <div className="space-y-4">
                {education.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">{item.school}</p>
                                {(item.degree || item.field) && (
                                    <p className="text-sm text-gray-600">
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
