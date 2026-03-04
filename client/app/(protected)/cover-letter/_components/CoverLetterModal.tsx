'use client';

import React, {useRef, useState} from 'react';
import {FormikProps} from 'formik';
import {CoverLetter} from '@/app/types/coverLetter.types';
import CoverLetterService from '@/app/services/coverLetter.service';
import {toast} from 'sonner';
import {CoverLetterForm} from './CoverLetterForm';
import {ModalContent} from '@/components/modal/ModalContent';
import {Button} from '@/components/ui/button';

interface CoverLetterModalProps {
    coverLetter: CoverLetter;
    onSave: (coverLetter: CoverLetter) => void;
    onClose?: () => void;
}

export function CoverLetterModal({
    coverLetter,
    onSave,
    onClose,
}: CoverLetterModalProps) {
    const formRef = useRef<FormikProps<CoverLetter>>(null);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: CoverLetter) => {
        setSubmitting(true);
        try {
            if (!coverLetter._id) {
                const res = await CoverLetterService.create(data);
                toast.success('Cover letter created successfully');
                onSave(res.coverLetter);
            } else {
                const res = await CoverLetterService.update(
                    coverLetter._id,
                    data,
                );
                toast.success('Cover letter updated successfully');
                onSave(res.coverLetter);
            }
            if (onClose) onClose();
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to save cover letter';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ModalContent
            title={
                coverLetter._id
                    ? `Edit Cover Letter: ${coverLetter.title}`
                    : 'Create New Cover Letter'
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
                        {isSubmitting ? 'Saving...' : 'Save Cover Letter'}
                    </Button>
                </>
            }
        >
            <CoverLetterForm
                coverLetter={coverLetter}
                onSubmit={handleSubmit}
                formRef={formRef}
            />
        </ModalContent>
    );
}
