'use client';

import EmptyState from '@/components/empty-state/EmptyState';
import ItemGrid from './ItemGrid';
import {LucideIcon} from 'lucide-react';

interface PageContentProps<T extends {_id: string}> {
    items: T[];
    onCreateNew: () => void;
    emptyIcon: LucideIcon;
    emptyTitle: string;
    emptyDescription: string;
    emptyActionLabel: string;
    renderItem: (item: T) => React.ReactNode;
}

export default function PageContent<T extends {_id: string}>({
    items,
    onCreateNew,
    emptyIcon,
    emptyTitle,
    emptyDescription,
    emptyActionLabel,
    renderItem,
}: PageContentProps<T>) {
    if (items.length === 0) {
        return (
            <EmptyState
                icon={emptyIcon}
                title={emptyTitle}
                description={emptyDescription}
                actionLabel={emptyActionLabel}
                onAction={onCreateNew}
            />
        );
    }

    return <ItemGrid items={items} renderItem={renderItem} />;
}
