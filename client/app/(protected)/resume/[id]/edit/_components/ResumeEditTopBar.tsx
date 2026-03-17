'use client';

import Link from 'next/link';
import {ArrowLeft, Save, Loader2} from 'lucide-react';
import {FormikErrors, FormikTouched} from 'formik';
import {Button} from '@/components/ui/button';
import {FormInput} from '@/components/form-fields/FormInput';
import {FormSelect} from '@/components/form-fields/FormSelect';

export type ResumeEditTopBarValues = {
    title: string;
    status: 'draft' | 'complete';
};

const STATUS_OPTIONS = [
    {value: 'draft', label: 'Draft'},
    {value: 'complete', label: 'Complete'},
];

interface ResumeEditTopBarProps {
    id: string;
    values: ResumeEditTopBarValues;
    errors: FormikErrors<ResumeEditTopBarValues>;
    touched: FormikTouched<ResumeEditTopBarValues>;
    saving: boolean;
    autoSaving: boolean;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    handleBlur: (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    triggerAutoSave: () => void;
}

export function ResumeEditTopBar({
    id,
    values,
    errors,
    touched,
    saving,
    autoSaving,
    handleChange,
    handleBlur,
    triggerAutoSave,
}: ResumeEditTopBarProps) {
    return (
        <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <Link href="/resume">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />
                    <FormInput
                        name="title"
                        label=""
                        value={values.title}
                        onChange={(e) => {
                            handleChange(e);
                            triggerAutoSave();
                        }}
                        onBlur={handleBlur}
                        placeholder="Resume title..."
                        error={errors.title}
                        touched={touched.title}
                        className="border-0 shadow-none text-base font-semibold bg-transparent focus-visible:ring-0 px-0"
                    />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    {autoSaving && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Saving...
                        </span>
                    )}
                    <FormSelect
                        name="status"
                        label=""
                        value={values.status}
                        onChange={(e) => {
                            handleChange(e);
                            triggerAutoSave();
                        }}
                        onBlur={handleBlur}
                        options={STATUS_OPTIONS}
                        className="w-32"
                    />
                    <Button
                        type="submit"
                        disabled={saving}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    >
                        {saving ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                        ) : (
                            <Save className="h-4 w-4 mr-1.5" />
                        )}
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                    <Link href={`/resume/${id}/preview`}>
                        <Button variant="outline" size="sm">
                            Preview
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
