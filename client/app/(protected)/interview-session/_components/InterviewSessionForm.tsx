'use client';

import {useMemo} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {InterviewSession} from '@/app/types/interviewSession.types';
import {FormInput} from '@/components/form-fields/FormInput';
import {FormSelect} from '@/components/form-fields/FormSelect';
import {useInterviewSessionForm} from '../_hooks/useInterviewSessionForm';

const InterviewSessionSchema = z.object({
    role: z.string().min(1, 'Role is required'),
    level: z.enum(['junior', 'mid', 'senior']).optional(),
});

const LEVEL_OPTIONS = [
    {value: 'junior', label: 'Junior'},
    {value: 'mid', label: 'Mid'},
    {value: 'senior', label: 'Senior'},
] as const;

interface InterviewSessionFormProps {
    session: InterviewSession;
    onSubmit: (values: InterviewSession) => Promise<void>;
    formRef?: React.Ref<FormikProps<InterviewSession>>;
}

export function InterviewSessionForm({
    session,
    onSubmit,
    formRef,
}: InterviewSessionFormProps) {
    const {assembleSubmitData} = useInterviewSessionForm(session);

    const initialValues = useMemo(
        () => ({
            ...session,
            role: session.role ?? '',
            level: session.level ?? 'junior',
        }),
        [session._id],
    );

    const handleSubmit = async (
        values: InterviewSession,
        {setSubmitting}: {setSubmitting: (v: boolean) => void},
    ) => {
        setSubmitting(true);
        await onSubmit(assembleSubmitData(values));
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(InterviewSessionSchema)}
            onSubmit={handleSubmit}
            innerRef={formRef}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <Form>
                    <div className="space-y-6">
                        <FormInput
                            name="role"
                            label="Role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Software Engineer, Product Manager"
                            isRequired
                            error={errors.role as string}
                            touched={touched.role}
                        />

                        <FormSelect
                            name="level"
                            label="Level"
                            value={values.level ?? ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={LEVEL_OPTIONS}
                            error={errors.level as string}
                            touched={touched.level}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}
