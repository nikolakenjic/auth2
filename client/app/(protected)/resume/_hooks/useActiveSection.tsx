import {useEffect, useState} from 'react';
import {SectionId, SECTIONS} from '../[id]/edit/_components/ResumeEditSidebar';

export function useActiveSection(): SectionId {
    const [activeSection, setActiveSection] = useState<SectionId>('contact');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach(({id}) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                {threshold: 0.4},
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return activeSection;
}
