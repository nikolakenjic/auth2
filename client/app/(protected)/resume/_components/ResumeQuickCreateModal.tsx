'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Formik, Form} from 'formik';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';
import {toast} from 'sonner';
import {ModalContent} from '@/components/modal/ModalContent';
import {Button} from '@/components/ui/button';
import {FormInput} from '@/components/form-fields/FormInput';
import {FormSelect} from '@/components/form-fields/FormSelect';
import ResumeService from '@/app/services/resume.service';
import {FileText} from 'lucide-react';

const Schema = z.object({
    title: z.string().min(1, 'Title is required'),
    status: z.enum(['draft', 'complete']),
});

const STATUS_OPTIONS = [
    {value: 'draft', label: 'Draft'},
    {value: 'complete', label: 'Complete'},
];

interface ResumeQuickCreateModalProps {
    onClose: () => void;
}

export function ResumeQuickCreateModal({onClose}: ResumeQuickCreateModalProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <ModalContent
            title={
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span>New Resume</span>
                </div>
            }
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
                        form="quick-create-form"
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                        {isSubmitting ? 'Creating...' : 'Create & Edit →'}
                    </Button>
                </>
            }
        >
            <Formik
                initialValues={{title: '', status: 'draft' as const}}
                validationSchema={toFormikValidationSchema(Schema)}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    try {
                        const res = await ResumeService.create({
                            title: values.title,
                            status: values.status,
                            sections: [],
                        });
                        toast.success('Resume created!');
                        onClose();
                        router.push(`/resume/${res.resume._id}/edit`);
                    } catch (err) {
                        toast.error('Failed to create resume');
                    } finally {
                        setIsSubmitting(false);
                    }
                }}
            >
                {({values, errors, touched, handleChange, handleBlur}) => (
                    <Form id="quick-create-form">
                        <div className="space-y-4 py-2">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Give your resume a name to get started. You can
                                fill in all the details on the next page.
                            </p>
                            <FormInput
                                name="title"
                                label="Resume Title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="e.g., Software Engineer Resume"
                                isRequired
                                error={errors.title}
                                touched={touched.title}
                            />
                            <FormSelect
                                name="status"
                                label="Status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={STATUS_OPTIONS}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </ModalContent>
    );
}
