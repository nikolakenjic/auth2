'use client';

import {useRef} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {User, FileText, Briefcase, GraduationCap, Wrench} from 'lucide-react';
import {Resume} from '@/app/types/resume.types';
import {FormTextarea} from '@/components/form-fields/FormTextarea';
import {useActiveSection} from '../_hooks/useActiveSection';
import {
    ResumeEditTopBar,
    ResumeEditTopBarValues,
} from '../[id]/edit/_components/ResumeEditTopBar';
import {useResumeForm} from '../_hooks/useResumeForm';
import {useSaveResume} from '../_hooks/useSaveResume';
import {ResumeEditSidebar} from '../[id]/edit/_components/ResumeEditSidebar';
import {ContactSection} from './ContactSection';
import {ExperienceSection} from './ExperienceSection';
import {EducationSection} from './EducationSection';
import {SkillsSection} from '../[id]/edit/_components/SkillsSection';

const Schema = z.object({
    title: z.string().min(1, 'Title is required'),
    status: z.enum(['draft', 'complete']),
});

interface ResumeEditorFormProps {
    resume: Resume;
    id: string;
}

export function ResumeEditorForm({resume, id}: ResumeEditorFormProps) {
    const formRef = useRef<FormikProps<ResumeEditTopBarValues>>(null);
    const activeSection = useActiveSection();

    const {
        experience,
        education,
        summaryText,
        skills,
        contact,
        setExperience,
        setEducation,
        setSummaryText,
        addSkill,
        removeSkill,
        updateSkill,
        setContact,
        assembleSubmitData,
    } = useResumeForm(resume);

    const {saving, autoSaving, saveResume, triggerAutoSave} = useSaveResume(
        id,
        resume,
        assembleSubmitData,
    );

    const handleAutoSave = () =>
        triggerAutoSave(
            () =>
                formRef.current?.values ?? {
                    title: resume.title,
                    status: resume.status,
                },
        );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Formik
                initialValues={{title: resume.title, status: resume.status}}
                validationSchema={toFormikValidationSchema(Schema)}
                onSubmit={(values) => saveResume(values)}
                innerRef={formRef}
            >
                {({values, errors, touched, handleChange, handleBlur}) => (
                    <Form>
                        <ResumeEditTopBar
                            id={id}
                            values={values}
                            errors={errors}
                            touched={touched}
                            saving={saving}
                            autoSaving={autoSaving}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            triggerAutoSave={handleAutoSave}
                        />

                        <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">
                            <ResumeEditSidebar
                                activeSection={activeSection}
                                onSectionClick={(sId) =>
                                    document
                                        .getElementById(sId)
                                        ?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        })
                                }
                            />

                            <div className="flex-1 space-y-6 min-w-0">
                                <section
                                    id="contact"
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
                                >
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <User className="h-4 w-4 text-indigo-500" />
                                        Contact Information
                                    </h2>
                                    <ContactSection
                                        contact={contact}
                                        onChange={(c) => {
                                            setContact(c);
                                            handleAutoSave();
                                        }}
                                    />
                                </section>

                                <section
                                    id="summary"
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
                                >
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-indigo-500" />
                                        Professional Summary
                                    </h2>
                                    <FormTextarea
                                        name="summary"
                                        label=""
                                        value={summaryText}
                                        onChange={(e) => {
                                            setSummaryText(e.target.value);
                                            handleAutoSave();
                                        }}
                                        placeholder="Write a short summary that highlights your skills and experience..."
                                        rows={5}
                                        helperText="A strong summary is 2-4 sentences and tailored to the role you're applying for."
                                    />
                                </section>

                                <section
                                    id="experience"
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
                                >
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-indigo-500" />
                                        Experience
                                    </h2>
                                    <ExperienceSection
                                        items={experience}
                                        onChange={(items) => {
                                            setExperience(items);
                                            handleAutoSave();
                                        }}
                                    />
                                </section>

                                <section
                                    id="education"
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
                                >
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4 text-indigo-500" />
                                        Education
                                    </h2>
                                    <EducationSection
                                        items={education}
                                        onChange={(items) => {
                                            setEducation(items);
                                            handleAutoSave();
                                        }}
                                    />
                                </section>

                                <section
                                    id="skills"
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
                                >
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Wrench className="h-4 w-4 text-indigo-500" />
                                        Skills
                                    </h2>
                                    <SkillsSection
                                        skills={skills}
                                        onAdd={addSkill}
                                        onRemove={removeSkill}
                                        onUpdate={updateSkill}
                                        onAutoSave={handleAutoSave}
                                    />
                                </section>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
