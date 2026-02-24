'use client'

import React, {useRef, useState} from 'react';
import {FormikProps} from 'formik';
import {Resume} from '@/app/types/resume.types';
import ResumeService from '@/app/services/resume.service';
import {toast} from 'sonner';
import {ResumeForm} from './ResumeForm';
import {ModalContent} from '@/components/modal/ModalContent';
import {Button} from '@/components/ui/button';

interface ResumeModalProps {
    resume: Resume;
    onSave: (resume: Resume) => void;
    onClose?: () => void;
}

export function ResumeModal({resume, onSave, onClose}: ResumeModalProps) {
    const formRef = useRef<FormikProps<Resume>>(null);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = async (resumeData: Resume) => {
        setSubmitting(true);

        try {
            if (!resume._id) {
                // Create new resume
                const res = await ResumeService.create(resumeData);
                toast.success('Resume created successfully');
                onSave(res.resume);
            } else {
                // Update existing resume
                const res = await ResumeService.update(resume._id, resumeData);
                toast.success('Resume updated successfully');
                onSave(res.resume);
            }
            if (onClose) onClose();
        } catch (error: any) {
            toast.error(error?.message || 'Failed to save resume');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ModalContent
            title={resume._id ? `Edit Resume: ${resume.title}` : 'Create New Resume'}
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
                        {isSubmitting ? 'Saving...' : 'Save Resume'}
                    </Button>
                </>
            }
        >
            <ResumeForm
                resume={resume}
                onSubmit={handleSubmit}
                formRef={formRef}
            />
        </ModalContent>
    );
}