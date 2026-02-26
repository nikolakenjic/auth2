'use client';

import {useMemo} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {Resume} from '@/app/types/resume.types';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {X, Plus} from 'lucide-react';
import {FormInput} from '@/components/form-fields/FormInput';
import {FormSelect} from '@/components/form-fields/FormSelect';
import {FormTextarea} from '@/components/form-fields/FormTextarea';
import {ExperienceSection} from './ExperienceSection';
import {EducationSection} from './EducationSection';
import {useResumeForm} from '../_hooks/useResumeForm';

const ResumeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    status: z.enum(['draft', 'complete']).optional(),
});

const STATUS_OPTIONS = [
    {value: 'draft', label: 'Draft'},
    {value: 'complete', label: 'Complete'},
] as const;

interface ResumeFormProps {
    resume: Resume;
    onSubmit: (values: Resume) => Promise<void>;
    formRef?: React.Ref<FormikProps<Resume>>;
}

export function ResumeForm({resume, onSubmit, formRef}: ResumeFormProps) {
    const {
        experience,
        education,
        summaryText,
        skills,
        setExperience,
        setEducation,
        setSummaryText,
        addSkill,
        removeSkill,
        updateSkill,
        assembleSubmitData,
    } = useResumeForm(resume);

    const initialValues = useMemo(
        () => ({
            ...resume,
            title: resume.title ?? '',
            status: resume.status ?? ('draft' as const),
        }),
        [resume._id],
    );

    const handleSubmit = async (
        values: Resume,
        {setSubmitting}: {setSubmitting: (v: boolean) => void},
    ) => {
        setSubmitting(true);
        await onSubmit(assembleSubmitData(values));
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(ResumeSchema)}
            onSubmit={handleSubmit}
            innerRef={formRef}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <Form>
                    <div className="space-y-6">
                        {/* Title Field */}
                        <FormInput
                            name="title"
                            label="Resume Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your resume title"
                            isRequired
                            error={errors.title as string}
                            touched={touched.title}
                        />

                        {/* Status Field */}
                        <FormSelect
                            name="status"
                            label="Status"
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={STATUS_OPTIONS}
                            error={errors.status as string}
                            touched={touched.status}
                        />

                        {/* Summary Section */}
                        <FormTextarea
                            name="summary"
                            label="ProfessionalSummary"
                            value={summaryText}
                            onChange={(e) => setSummaryText(e.target.value)}
                            placeholder="Enter your professional summary"
                            rows={5}
                            helperText="Write a short summary that highlights your skills and experience in a professional manner."
                        />

                        {/* Experience Section */}
                        <ExperienceSection
                            items={experience}
                            onChange={setExperience}
                        />

                        {/* Education Section */}
                        <EducationSection
                            items={education}
                            onChange={setEducation}
                        />

                        {/* Skills Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Label>Skills</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addSkill}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Skill
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {skills.length === 0 ? (
                                    <p className="text-sm text-gray-500 py-4 text-center border border-dashed rounded">
                                        No skills added yet. Click &ldquo;Add
                                        Skill&ldquo; to get started.
                                    </p>
                                ) : (
                                    skills.map((skill, index) => (
                                        <div key={index} className="flex gap-2">
                                            <FormInput
                                                name={`skill-${index}`}
                                                label=""
                                                value={skill}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g., React, Typescript, Next.js"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    removeSkill(index)
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
