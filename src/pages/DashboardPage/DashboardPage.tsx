import { useParams } from "react-router-dom";

export default function DashboardPage() {
  const { dashboardId } = useParams();
  return (
    <div>
      대시보드 페이지 입니다.{" "}
      {dashboardId ? (
        <div>{dashboardId}에 해당하는 정보를 렌더링합니다</div>
      ) : (
        <div>아무것도 선택되지 않은 상태의 대시보드를 렌더링합니다</div>
      )}
    </div>
  );
}
