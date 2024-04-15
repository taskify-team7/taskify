import { useState } from "react";

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  return {
    openModal,
    handleModalOpen,
    handleModalClose,
  };
};
