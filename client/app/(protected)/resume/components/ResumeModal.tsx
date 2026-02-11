'use client'

import React, {useRef, useState} from 'react';
import {FormikProps} from 'formik';
import {Resume} from '@/app/types/resume.types';
import ResumeService from '@/app/services/resume.service';
import {toast} from 'sonner';
import {ResumeForm} from './ResumeForm';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

interface ResumeModalProps {
    resume: Resume;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (resume: Resume) => void;
}

export function ResumeModal({resume, open, onOpenChange, onSave}: ResumeModalProps) {
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
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to save resume');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {resume._id ? `Edit Resume: ${resume.title}` : 'Create New Resume'}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <ResumeForm
                        resume={resume}
                        onSubmit={handleSubmit}
                        formRef={formRef}
                    />
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
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
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}