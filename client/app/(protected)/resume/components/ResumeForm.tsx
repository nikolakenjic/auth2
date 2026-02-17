'use client';

import React, { useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { Resume, ResumeSection } from '@/app/types/resume.types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

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
      {
        type: 'summary',
        content: { text: summaryText },
      },
      {
        type: 'experience',
        content: { items: [] },
      },
      {
        type: 'education',
        content: { items: [] },
      },
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
                className={
                  touched.title && errors.title ? 'border-red-500' : ''
                }
              />
              {touched.title && errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title as string}
                </p>
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

            {/* Summary Section */}
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={summaryText}
                onChange={(e) => setSummaryText(e.target.value)}
                placeholder="Brief summary of your professional background and key achievements..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Write a compelling summary that highlights your expertise
              </p>
            </div>

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
                      <Input
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        placeholder="e.g., React, TypeScript, Node.js"
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

              <p className="text-xs text-gray-500 mt-2">
                Add your technical and professional skills
              </p>
            </div>

            {/* Info note */}
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-xs text-blue-700">
                💡 Experience and Education sections will be added in the next
                step
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
