// @ts-nocheck
import styles from "./DashBoardPage.module.css";
import Columns from "../../components/Column/Columns";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import ColumnCreateModal from "../../components/Modal/ColumnCreateModal";
import { useNavigate, useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getCards, getColumns } from "../../api/dashboard";
import { ColumnType } from "../../interface/DashboardType";

export default function DashBoardPage() {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const { id = "" } = useParams(); // 대시보드 id
  const navigate = useNavigate();
  const { data: columns, error } = useQuery<ColumnType[]>({
    queryKey: ["columns", id],
    queryFn: () => getColumns(id),
    initialData: [],
    enabled: id !== "",
  });
  const allCards = [];
  const wow = useQueries<any>({
    queries:
      columns?.map((col: any) => {
        return {
          queryKey: ["column", col.id + ""],
          queryFn: () => getCards(col.id),
        };
      }) ?? [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  if (!wow.pending) {
    wow.data.map((arr) => arr.map((c) => allCards.push(c)));
  }
  if (id && error) {
    console.log("cannot load columns with the provided dashboard id" + id);
    navigate("/dashboard");
  }

  return (
    <>
      {createPortal(
        isModalOpen && (
          <ColumnCreateModal
            handleModalClose={handleModalClose}
            dashboardId={Number(id)}
          />
        ),
        document.body
      )}
      <div className={styles.container}>
        <Columns columns={columns} allCards={allCards} />
        <button onClick={handleModalOpen}>새로운 칼럼 추가하기</button>
      </div>
    </>
  );
}
