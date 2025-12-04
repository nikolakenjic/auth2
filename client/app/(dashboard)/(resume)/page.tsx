"use client";

import { useEffect, useState } from "react";
import ResumeService from "@/app/services/resume.service";
import {Resume} from "@/app/types/resume.types";

export default function ResumePage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const res = await ResumeService.getAll();
            setResumes(res.resumes);
        } catch (err: any) {
            setError(err?.message || "Failed to load resumes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    if (loading) return <div>Loading resumes…</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Your Resumes</h1>

            {resumes.length === 0 ? (
                <p>No resumes yet.</p>
            ) : (
                <ul className="space-y-3">
                    {resumes.map((resume: any) => (
                        <li key={resume._id} className="p-4 bg-gray-100 rounded-md">
                            <h2 className="font-bold">{resume.title}</h2>
                            <p>{resume.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
