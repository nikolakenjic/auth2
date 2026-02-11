'use client'

import {useModal} from "@/app/context/ModalContext";
import {ModalContent} from "@/components/modal/ModalContent";
import {Button} from "@/components/ui/button";

export default function ResumePage() {
    const {openModal, closeModal} = useModal();

    const handleTestModal = () => {
        openModal(
            <ModalContent
                title="Test Modal"
                footerContent={
                    <Button onClick={closeModal}>Close</Button>
                }
            >
                <p>This is a test modal! If you see this, the modal system works! 🎉</p>
            </ModalContent>
        );
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Test Modal System</h1>
            <Button onClick={handleTestModal}>
                Open Test Modal
            </Button>
        </div>
    );
}