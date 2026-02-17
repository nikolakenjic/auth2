import { ModalContent } from './ModalContent';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  onDelete: () => void;
  onClose?: () => void;
}
export function ConfirmDeleteModal({
  title,
  message,
  onDelete,
  onClose,
}: ConfirmDeleteModalProps) {
  const handleDelete = () => {
    onDelete();
    if (onClose) onClose();
  };

  return (
    <ModalContent
      title={
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>Confirm Delete</span>
        </div>
      }
      footerContent={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </ModalContent>
  );
}
