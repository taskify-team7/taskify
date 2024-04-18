import TodoCreateModal from "../../components/Modal/TodoCreateModal";
import { useModal } from "../../hooks/useModal";

export default function LandingPage() {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div>
      <TodoCreateModal handleModalClose={handleModalClose} />
    </div>
  );
}
