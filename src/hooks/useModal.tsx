import { useCallback, useState, useMemo } from 'react';

type ModalState = {
    handleCloseModal: () => void;
    handleOpenModal: () => void;
    isOpen: boolean;
};

const useModal: () => ModalState = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = useCallback((): void => {
        setIsOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        setIsOpen(false);
    }, []);

    return useMemo(
        () => ({
            handleCloseModal,
            handleOpenModal,
            isOpen,
        }),
        [handleCloseModal, handleOpenModal, isOpen],
    );
};

export default useModal;
