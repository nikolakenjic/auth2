import {JobDescription} from '@/app/types/jobDescription.types';
import {useCallback, useState} from 'react';

export function useJobDescriptionForm(jobDescription: JobDescription) {
    const [text, setText] = useState<string>(jobDescription.text ?? '');

    const assembleSubmitData = useCallback(
        (
            formikValues: Pick<JobDescription, 'title' | 'text'>,
        ): JobDescription => {
            return {
                ...jobDescription,
                ...formikValues,
                text,
            };
        },
        [jobDescription, text],
    );

    return {
        text,
        setText,
        assembleSubmitData,
    };
}
