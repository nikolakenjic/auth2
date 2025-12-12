'use client'

import {Resume} from "@/app/types/resume.types";
import {Dialog, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog";
import ResumeForm from "./ResumeForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initial?: Partial<Resume>;
    onSave: (resume: Resume) => void;
    submitting?: boolean;
}

export default function ResumeModal({open, onOpenChange, initial = {}, onSave, submitting}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <h3 className="text-lg font-medium">{initial._id ? 'Edit Resume' : 'Create Resume'}</h3>
                </DialogHeader>

                <ResumeForm initial={initial} onSubmit={async (values) => {
                    await onSave(values as Resume);
                }} submitting={submitting}/>

                <DialogFooter/>
            </DialogContent>
        </Dialog>
    )
}