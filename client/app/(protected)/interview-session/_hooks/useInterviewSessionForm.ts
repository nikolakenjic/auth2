import {InterviewSession} from '@/app/types/interviewSession.types';
import {useCallback} from 'react';

export function useInterviewSessionForm(session: InterviewSession) {
    const assembleSubmitData = useCallback(
        (
            formikValues: Pick<InterviewSession, 'role' | 'level'>,
        ): InterviewSession => {
            return {
                ...session,
                ...formikValues,
            };
        },
        [session],
    );

    return {assembleSubmitData};
}
