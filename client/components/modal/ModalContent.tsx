import React, {ReactElement, ReactNode} from 'react';
import {DialogHeader, DialogFooter, DialogTitle} from '@/components/ui/dialog';
import {ScrollArea} from '@/components/ui/scroll-area';

interface ModalContentProps {
    title: string | ReactElement;
    children: ReactNode;
    footerContent?: ReactNode;
    titleClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    scrollableContent?: boolean;
}

export function ModalContent({
                                 title,
                                 children,
                                 footerContent,
                                 titleClassName,
                                 contentClassName,
                                 footerClassName,
                                 scrollableContent = false
                             }: ModalContentProps) {
    return (
        <>
            <DialogHeader className={`px-4 pb-3.5 border-b items-start ${titleClassName || ''}`}>
                <DialogTitle className={'text-xl font-semibold'}>{title}</DialogTitle>
            </DialogHeader>
            <div className={'h-full flex overflow-hidden'}>
                <ScrollArea className={'flex-1'}>
                    <div className={`px-4 pt-4 pb-4 ${contentClassName || ''}`}>
                        {children}
                    </div>
                </ScrollArea>
            </div>
            {footerContent && (
                <DialogFooter className={`px-4 pt-4 border-t items-end ${footerClassName || ''}`}>
                    {footerContent}
                </DialogFooter>
            )}
        </>
    );
}
