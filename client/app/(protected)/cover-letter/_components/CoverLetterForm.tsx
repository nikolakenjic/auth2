'use client';

import {useMemo} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {CoverLetter} from '@/app/types/coverLetter.types';
import {FormInput} from '@/components/form-fields/FormInput';
import {FormTextarea} from '@/components/form-fields/FormTextarea';
import {useCoverLetterForm} from '../_hooks/useCoverLetterForm';

const CoverLetterSchema = z.object({
    title: z.string().min(1, 'Title is required'),
});

interface CoverLetterFormProps {
    coverLetter: CoverLetter;
    onSubmit: (values: CoverLetter) => Promise<void>;
    formRef?: React.Ref<FormikProps<CoverLetter>>;
}

export function CoverLetterForm({
    coverLetter,
    onSubmit,
    formRef,
}: CoverLetterFormProps) {
    const {content, setContent, assembleSubmitData} =
        useCoverLetterForm(coverLetter);

    const initialValues = useMemo(
        () => ({
            ...coverLetter,
            title: coverLetter.title ?? '',
        }),
        [coverLetter._id],
    );

    const handleSubmit = async (
        values: CoverLetter,
        {setSubmitting}: {setSubmitting: (v: boolean) => void},
    ) => {
        setSubmitting(true);
        await onSubmit(assembleSubmitData(values));
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(CoverLetterSchema)}
            onSubmit={handleSubmit}
            innerRef={formRef}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <Form>
                    <div className="space-y-6">
                        <FormInput
                            name="title"
                            label="Cover Letter Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Cover Letter for Software Engineer at Acme"
                            isRequired
                            error={errors.title as string}
                            touched={touched.title}
                        />

                        <FormTextarea
                            name="content"
                            label="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your cover letter here..."
                            rows={12}
                            helperText="Write a personalized cover letter tailored to the job you're applying for."
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}
