import {LucideIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
                                       icon: Icon,
                                       title,
                                       description,
                                       actionLabel,
                                       onAction
                                   }: EmptyStateProps) {
    return (
        <div className="text-center py-16">
            <Icon className="h-16 w-16 mx-auto text-gray-300 mb-4"/>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
                {title}
            </h2>
            <p className="text-gray-500 mb-6">
                {description}
            </p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}