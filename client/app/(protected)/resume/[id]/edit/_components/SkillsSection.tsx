'use client';

import {Button} from '@/components/ui/button';

interface SkillsSectionProps {
    skills: string[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, value: string) => void;
    onAutoSave?: () => void;
}

export function SkillsSection({
    skills,
    onAdd,
    onRemove,
    onUpdate,
    onAutoSave,
}: SkillsSectionProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Add your technical and professional skills.
                </p>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onAdd}
                    className="flex items-center gap-1"
                >
                    + Add Skill
                </Button>
            </div>
            {skills.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center border border-dashed rounded-lg">
                    No skills added yet. Click &quot;Add Skill&quot; to get
                    started.
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1"
                        >
                            <input
                                value={skill}
                                onChange={(e) => {
                                    onUpdate(index, e.target.value);
                                    onAutoSave?.();
                                }}
                                placeholder="e.g., React"
                                className="bg-transparent text-sm text-indigo-700 dark:text-indigo-300 outline-none w-24 min-w-0"
                            />
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="text-indigo-400 hover:text-red-500 transition-colors ml-1"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
