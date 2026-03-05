'use client';

import React, {useRef, useState} from 'react';
import {FormikProps} from 'formik';
import {JobDescription} from '@/app/types/jobDescription.types';
import JobDescriptionService from '@/app/services/jobDescription.service';
import {toast} from 'sonner';

import {ModalContent} from '@/components/modal/ModalContent';
import {Button} from '@/components/ui/button';
import {JobDescriptionForm} from './JobDescriptionFrom';

interface JobDescriptionModalProps {
    jobDescription: JobDescription;
    onSave: (jobDescription: JobDescription) => void;
    onClose?: () => void;
}

export function JobDescriptionModal({
    jobDescription,
    onSave,
    onClose,
}: JobDescriptionModalProps) {
    const formRef = useRef<FormikProps<JobDescription>>(null);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: JobDescription) => {
        setSubmitting(true);
        console.log('JD', data);
        try {
            if (!jobDescription._id) {
                const res = await JobDescriptionService.create(data);
                toast.success('Job description saved successfully');
                onSave(res.jobDescription);
            } else {
                const res = await JobDescriptionService.update(
                    jobDescription._id,
                    data,
                );
                toast.success('Job description updated successfully');
                onSave(res.jobDescription);
            }
            if (onClose) onClose();
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to save job description';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ModalContent
            title={
                jobDescription._id
                    ? `Edit: ${jobDescription.title || 'Job Description'}`
                    : 'Add Job Description'
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
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </>
            }
        >
            <JobDescriptionForm
                jobDescription={jobDescription}
                onSubmit={handleSubmit}
                formRef={formRef}
            />
        </ModalContent>
    );
}
