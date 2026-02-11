'use client';

import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Modal} from '@/components/modal/Modal';

interface ModalEntry {
    content: ReactNode;
    key: string;
    compact?: boolean;
}

interface ModalContextProps {
    openModal: (modalContent: ReactNode) => void;
    openCompactModal: (modalContent: ReactNode) => void;
    closeModal: () => void;
    closeAllModals: () => void;
    isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({children}: { children: ReactNode }) {
    const [modals, setModals] = useState<ModalEntry[]>([]);

    const openModal = (content: ReactNode) => {
        setModals(prev => [...prev, {content, key: `${Date.now()}-${prev.length}`}]);
    };

    const openCompactModal = (content: ReactNode) => {
        setModals((prev) => [
            ...prev,
            {content, key: `${Date.now()}-${prev.length}`, compact: true}
        ]);
    };

    const closeModal = () => {
        setModals(prev => prev.slice(0, -1));
    };

    const closeAllModals = () => {
        setModals([]);
    };

    return (
        <ModalContext.Provider
            value={{openModal, openCompactModal, closeModal, closeAllModals, isModalOpen: modals.length > 0}}>
            {children}
            {modals.map(({content, key, compact}) => (
                <Modal key={key} onClose={closeModal} compact={compact}>
                    {content}
                </Modal>
            ))}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}