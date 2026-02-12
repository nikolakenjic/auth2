'use client'

import React from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {Resume} from '@/app/types/resume.types';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';

interface ResumeFormProps {
    resume: Resume;
    onSubmit: (values: Resume) => void;
    formRef?: React.Ref<FormikProps<Resume>>;
}

export function ResumeForm({resume, onSubmit, formRef}: ResumeFormProps) {
    // Validation schema
    const ResumeSchema = z.object({
        title: z.string().min(1, 'Title is required'),
        status: z.enum(['draft', 'complete']).optional(),
    });

    const initialValues = {
        ...resume,
        title: resume.title || '',
        status: resume.status || 'draft' as const,
    };

    const handleOnSubmit = async (values: any, {setSubmitting}: any) => {
        setSubmitting(true);
        await onSubmit(values as Resume);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(ResumeSchema)}
            onSubmit={handleOnSubmit}
            innerRef={formRef}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <Form>
                    <div className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <Label htmlFor="title">
                                Resume Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="e.g., Senior Frontend Developer Resume"
                                className={touched.title && errors.title ? 'border-red-500' : ''}
                            />
                            {touched.title && errors.title && (
                                <p className="text-sm text-red-500 mt-1">{errors.title as string}</p>
                            )}
                        </div>

                        {/* Status Field */}
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="draft">Draft</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>

                        {/* Info note */}
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <p className="text-xs text-blue-700">
                                💡 Sections (Summary, Experience, Education, Skills) will be added in the next step
                            </p>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}