import {useCallback, useRef, useState} from 'react';
import {toast} from 'sonner';
import {Resume} from '@/app/types/resume.types';
import ResumeService from '@/app/services/resume.service';

export function useSaveResume(
    id: string,
    resume: Resume,
    assembleSubmitData: (values: Pick<Resume, 'title' | 'status'>) => Resume,
) {
    const [saving, setSaving] = useState(false);
    const [autoSaving, setAutoSaving] = useState(false);
    const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
    const resumeRef = useRef(resume);
    resumeRef.current = resume;

    const saveResume = useCallback(
        async (values: Pick<Resume, 'title' | 'status'>, silent = false) => {
            if (!silent) setSaving(true);
            else setAutoSaving(true);
            try {
                const data = assembleSubmitData({
                    ...resumeRef.current,
                    ...values,
                });
                await ResumeService.update(id, data);
                if (!silent) toast.success('Resume saved!');
            } catch {
                if (!silent) toast.error('Failed to save resume');
            } finally {
                setSaving(false);
                setAutoSaving(false);
            }
        },
        [id, assembleSubmitData],
    );

    const triggerAutoSave = useCallback(
        (getValues: () => Pick<Resume, 'title' | 'status'>) => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
            autoSaveTimer.current = setTimeout(() => {
                saveResume(getValues(), true);
            }, 2000);
        },
        [saveResume],
    );

    return {saving, autoSaving, saveResume, triggerAutoSave};
}
