import {Loader2} from "lucide-react";

interface LoadingStateProps {
    message?: string;
    className?: string;
}

export default function LoadingState({message, className}: LoadingStateProps) {
    return (
        <div className={`flex h-screen items-center justify-center ${className || ''}`}>
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto"/>
                {message && (
                    <p className="text-sm text-gray-500 mt-2">{message}</p>
                )}
            </div>
        </div>
    );
}