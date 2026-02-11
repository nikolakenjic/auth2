import {cloneElement, ReactNode} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    compact?: boolean;
    className?: string;
}

export function Modal({onClose, children, compact, className}: ModalProps) {
    const contentWithOnClose = cloneElement(children as React.ReactElement, {onClose} as any);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className={`overflow-hidden flex flex-col h-auto px-0 gap-0 max-h-full
                    ${compact ? 'sm:w-3/5 lg:w-1/3' : 'max-w-full w-full sm:w-4/5 lg:w-3/5'}
                    ${className}`
                }
            >
                {contentWithOnClose}
            </DialogContent>
        </Dialog>
    );
}