'use client';

interface ItemGridProps<T extends {_id: string}> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function ItemGrid<T extends {_id: string}>({
    items,
    renderItem,
}: ItemGridProps<T>) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <div key={item._id}>{renderItem(item)}</div>
            ))}
        </div>
    );
}
