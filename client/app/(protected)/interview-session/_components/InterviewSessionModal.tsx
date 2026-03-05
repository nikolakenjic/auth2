'use client';

import React, {useRef, useState} from 'react';
import {FormikProps} from 'formik';
import {InterviewSession} from '@/app/types/interviewSession.types';
import InterviewSessionService from '@/app/services/interviewSession.service';
import {toast} from 'sonner';
import {InterviewSessionForm} from './InterviewSessionForm';
import {ModalContent} from '@/components/modal/ModalContent';
import {Button} from '@/components/ui/button';

interface InterviewSessionModalProps {
    session: InterviewSession;
    onSave: (session: InterviewSession) => void;
    onClose?: () => void;
}

export function InterviewSessionModal({
    session,
    onSave,
    onClose,
}: InterviewSessionModalProps) {
    const formRef = useRef<FormikProps<InterviewSession>>(null);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: InterviewSession) => {
        setSubmitting(true);
        try {
            if (!session._id) {
                const res = await InterviewSessionService.create(data);
                toast.success('Interview session created successfully');
                onSave(res.session);
            } else {
                const res = await InterviewSessionService.update(
                    session._id,
                    data,
                );
                toast.success('Interview session updated successfully');
                onSave(res.session);
            }
            if (onClose) onClose();
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to save interview session';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ModalContent
            title={
                session._id
                    ? `Edit Session: ${session.role}`
                    : 'Start New Interview Session'
            }
            scrollableContent={true}
            footerContent={
                <>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => formRef.current?.submitForm()}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Saving...'
                            : session._id
                              ? 'Save Changes'
                              : 'Start Session'}
                    </Button>
                </>
            }
        >
            <InterviewSessionForm
                session={session}
                onSubmit={handleSubmit}
                formRef={formRef}
            />
        </ModalContent>
    );
}
