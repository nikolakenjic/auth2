'use client';

import {useMemo} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {JobDescription} from '@/app/types/jobDescription.types';
import {FormInput} from '@/components/form-fields/FormInput';
import {FormTextarea} from '@/components/form-fields/FormTextarea';
import {useJobDescriptionForm} from '../_hooks/useJobDescriptionForm';

const JobDescriptionSchema = z.object({
    title: z.string().optional(),
    text: z.string().min(1, 'Job description text is required'),
});

interface JobDescriptionFormProps {
    jobDescription: JobDescription;
    onSubmit: (values: JobDescription) => Promise<void>;
    formRef?: React.Ref<FormikProps<JobDescription>>;
}

export function JobDescriptionForm({
    jobDescription,
    onSubmit,
    formRef,
}: JobDescriptionFormProps) {
    const initialValues = useMemo(
        () => ({
            ...jobDescription,
            title: jobDescription.title ?? '',
        }),
        [jobDescription._id],
    );

    const handleSubmit = async (
        values: JobDescription,
        {setSubmitting}: {setSubmitting: (v: boolean) => void},
    ) => {
        setSubmitting(true);
        await onSubmit(values);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(JobDescriptionSchema)}
            onSubmit={handleSubmit}
            innerRef={formRef}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <Form>
                    <div className="space-y-6">
                        <FormInput
                            name="title"
                            label="Title"
                            value={values.title ?? ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Senior Frontend Engineer at Acme"
                            error={errors.title as string}
                            touched={touched.title}
                        />

                        <FormTextarea
                            name="text"
                            label="Job Description"
                            value={values.text}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paste the full job description here..."
                            rows={14}
                            isRequired
                            error={errors.text as string}
                            helperText="Paste the full job description. AI will extract keywords and match it against your resume."
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}
