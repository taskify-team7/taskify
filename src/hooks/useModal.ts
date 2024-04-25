import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  };
};

export interface ModalType {
  isModalOpen: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}
