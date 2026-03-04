import {CoverLetter} from '@/app/types/coverLetter.types';
import {useCallback, useState} from 'react';

export function useCoverLetterForm(coverLetter: CoverLetter) {
    const [content, setContent] = useState<string>(coverLetter.content ?? '');

    const assembleSubmitData = useCallback(
        (formikValues: Pick<CoverLetter, 'title'>): CoverLetter => {
            return {
                ...coverLetter,
                ...formikValues,
                content,
            };
        },
        [coverLetter, content],
    );

    return {
        content,
        setContent,
        assembleSubmitData,
    };
}
