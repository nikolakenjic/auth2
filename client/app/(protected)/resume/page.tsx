import {useResumes} from "@/app/hooks/(resume)/useResumes";
import {useDeleteResume} from "@/app/hooks/(resume)/useDeleteResume";
import {useRouter} from "next/navigation";
import {FileText, Loader2, Pencil, Plus, Trash2} from "lucide-react";

export default function ResumePage() {
    const {resumes, loading, error, refetch} = useResumes()
    const {remove, loading: deleting} = useDeleteResume()
    const router = useRouter()


    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={() => refetch()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Resumes</h1>
                <button
                    onClick={() => router.push('/resume/new')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    <Plus className="h-5 w-5"/>
                    Create New Resume
                </button>
            </div>

            {/* Empty State */}
            {resumes.length === 0 && (
                <div className="text-center py-16">
                    <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4"/>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h2>
                    <p className="text-gray-500 mb-6">Create your first resume to get started</p>
                    <button
                        onClick={() => router.push('/resume/new')}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Create Your First Resume
                    </button>
                </div>
            )}

            {/* Resume Grid */}
            {resumes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
                        >
                            {/* Card Content */}
                            <div onClick={() => router.push(`/resume/${resume._id}`)}>
                                <h3 className="text-xl font-semibold mb-2">{resume.title}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${
                                            resume.status === 'complete'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {resume.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Created: {new Date(resume.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/resume/${resume._id}`);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
                                >
                                    <Pencil className="h-4 w-4"/>
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => {
                                        // e.stopPropagation();
                                        // handleDelete(resume._id);
                                        console.log('Delete')
                                    }}
                                    disabled={deleting}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition disabled:opacity-50"
                                >
                                    <Trash2 className="h-4 w-4"/>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );


}