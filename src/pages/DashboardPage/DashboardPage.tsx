import { useParams } from "react-router-dom";
import CreateBoardButton from "../../components/CreateBoardButton/CreateBoardButton";

export default function DashboardPage() {
  const { dashboardId } = useParams();
  return (
    <div>
      <div>
        <CreateBoardButton />
      </div>
    </div>
  );
}
