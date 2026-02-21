'use client';

import React, { useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import {
  EducationItem,
  ExperienceItem,
  Resume,
  ResumeSection,
} from '@/app/types/resume.types';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { FormInput } from '@/components/form-fields/FormInput';
import { FormSelect } from '@/components/form-fields/FormSelect';
import { FormTextarea } from '@/components/form-fields/FormTextarea';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';

interface ResumeFormProps {
  resume: Resume;
  onSubmit: (values: Resume) => void;
  formRef?: React.Ref<FormikProps<Resume>>;
}

export function ResumeForm({ resume, onSubmit, formRef }: ResumeFormProps) {
  // Helper to get section by type
  const getSection = (sections: ResumeSection[], type: string) => {
    return sections.find((s) => s.type === type); // ✅ Fixed typo: section -> sections
  };

  //   experience and education
  const [experience, setExperience] = useState<ExperienceItem[]>(
    (getSection(resume.sections || [], 'experience') as any)?.content?.items ||
      [],
  );
  const [education, setEducation] = useState<EducationItem[]>(
    (getSection(resume.sections || [], 'education') as any)?.content?.items ||
      [],
  );

  // Extract initial values from sections
  const summarySection = getSection(resume.sections || [], 'summary') as any;
  const skillsSection = getSection(resume.sections || [], 'skills') as any;

  const [summaryText, setSummaryText] = useState(
    summarySection?.content?.text || '',
  );
  const [skills, setSkills] = useState<string[]>(
    skillsSection?.content?.items || [],
  );

  // Validation schema
  const ResumeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    status: z.enum(['draft', 'complete']).optional(),
  });

  const initialValues = {
    ...resume,
    title: resume.title || '',
    status: resume.status || ('draft' as const),
  };

  const handleOnSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);

    const sections: ResumeSection[] = [
      { type: 'summary', content: { text: summaryText } },
      { type: 'experience', content: { items: experience } },
      { type: 'education', content: { items: education } },
      {
        type: 'skills',
        content: { items: skills.filter((s) => s.trim() !== '') },
      },
    ];

    const submitData = {
      ...values,
      sections,
    };

    await onSubmit(submitData as Resume);
    setSubmitting(false);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'complete', label: 'Complete' },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(ResumeSchema)}
      onSubmit={handleOnSubmit}
      innerRef={formRef}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
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
              options={statusOptions}
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
            <ExperienceSection items={experience} onChange={setExperience} />

            {/* Education Section */}
            <EducationSection items={education} onChange={setEducation} />

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
                    No skills added yet. Click "Add Skill" to get started.
                  </p>
                ) : (
                  skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <FormInput
                        name={`sill-${index}`}
                        label=""
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        placeholder="e.g., React, Typescript, Next.js"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSkill(index)}
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
