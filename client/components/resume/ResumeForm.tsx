'use client'

import {ResumeSchema, ResumeType} from "@/app/lib/validations/resume.schema";
import {Formik, Form, Field, FieldArray} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {Button} from "@/components/ui/button";

interface Props {
    initial: Partial<ResumeType>;
    onSubmit: (values: Partial<ResumeType>) => Promise<void> | void;
    submitting?: boolean;
}

export default function ResumeForm({initial, onSubmit, submitting = false}: Props) {
    return (
        <Formik initialValues={initial}
                validationSchema={toFormikValidationSchema(ResumeSchema)}
                onSubmit={onSubmit}
                enableReinitialize
        >
            {
                ({values, handleSubmit}) => (
                    <Form onSubmit={handleSubmit} className='space-y-4'>
                        {/*    Title*/}
                        <div>
                            <Label>Title</Label>
                            <Field name="title" as={Input}/>
                        </div>

                        {/* Sections */}
                        <FieldArray name="sections">
                            {({ push, remove }) => (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Sections</Label>
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                push({
                                                    id: Date.now().toString(),
                                                    title: '',
                                                    content: '',
                                                })
                                            }
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {values.sections?.map((_: any, idx: number) => (
                                        <div key={idx} className="p-2 border rounded">

                                            <div className="flex gap-2">
                                                <Field
                                                    name={`sections.${idx}.title`}
                                                    placeholder="Section title"
                                                    as={Input}
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => remove(idx)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>

                                            <Field
                                                name={`sections.${idx}.content`}
                                                as="textarea"
                                                placeholder="Section content"
                                                className="w-full p-2 mt-2 border rounded"
                                            />

                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={submitting}>
                                Save
                            </Button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}