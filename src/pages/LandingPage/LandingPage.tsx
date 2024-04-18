import ColumnCreateModal from "../../components/Modal/ColumnCreateModal";
import TodoCreateModal from "../../components/Modal/TodoCreateModal";
import { useModal } from "../../hooks/useModal";

export default function LandingPage() {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div>
      <ColumnCreateModal
        handleModalClose={handleModalClose}
        dashboardId={5934}
      />
    </div>
  );
}
