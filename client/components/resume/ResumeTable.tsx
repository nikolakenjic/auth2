'use client'

import {Resume} from "@/app/types/resume.types";
import {Table, TableCell, TableHeader, TableRow} from "../ui/table";
import {Button} from "@/components/ui/button";

interface Props {
    resumes: Resume[];
    onEdit: (resume: Resume) => void;
    onDelete: (id: string) => void;
}

export default function ResumeTable({resumes, onEdit, onDelete}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell className='text-right'>Actions</TableCell>
                </TableRow>
            </TableHeader>
            <tbody>
            {
                resumes.map((r) => (
                    <tr key={r._id} className='odd:bg-white even:bg-slate-50'>
                        <td className="p-3">{r.title}</td>
                        <td className="p-3">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</td>
                        <td className="p-3 text-right">
                            <div className="flex gap-2 justify-end">
                                <Button size="sm" variant="ghost" onClick={() => onEdit(r)}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => onDelete(r._id!)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    )
}