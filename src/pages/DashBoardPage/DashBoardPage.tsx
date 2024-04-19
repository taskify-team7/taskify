// @ts-nocheck
import styles from "./DashBoardPage.module.css";
import Columns from "../../components/Column/Columns";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import ColumnCreateModal from "../../components/Modal/ColumnCreateModal";
import { useNavigate, useParams } from "react-router-dom";
import {
  useQueries,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { changeCard, getCards, getColumns } from "../../api/dashboard";

export default function DashBoardPage() {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const { id = "" } = useParams(); // 대시보드 id
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: columns, error } = useQuery<any>({
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

  const { mutate } = useMutation({
    mutationFn: async ({ source, destination, draggableId }) => {
      const originalCard = allCards.find(
        (card) => card.id === Number(draggableId)
      );
      originalCard.columnId = destination.droppableId;
      await changeCard(draggableId, {
        columnId: Number(originalCard.columnId),
        assigneeUserId: originalCard.assigneeUserId,
        title: originalCard.title,
        description: originalCard.description,
        dueDate: originalCard.dueDate,
        tags: [...originalCard.tags],
        imageUrl: originalCard.imageUrl,
      });
    },
    onMutate: async ({ source, destination, draggableId }) => {
      const startList =
        queryClient.getQueryData<any[]>(["column", source.droppableId]) || [];
      const endList =
        queryClient.getQueryData<any[]>(["column", destination.droppableId]) ||
        [];
      const newEndList = endList;
      newEndList.splice(destination.index, 0, startList[source.index]);
      newEndList.sort((a, b) => a.id - b.id);
      const newStartList = startList.filter(
        (_: any, idx: any) => idx !== source.index
      );
      queryClient.setQueryData(["column", source.droppableId], newStartList);
      queryClient.setQueryData(["column", destination.droppableId], newEndList);
      // return { source, destination, startList, endList };
    },

    onSettled: (data, error, variables) => {
      const { source, destination } = variables;
      queryClient.invalidateQueries({
        queryKey: ["column", source.droppableId],
      });
      queryClient.invalidateQueries({
        queryKey: ["column", destination.droppableId],
      });
    },
  });

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
        <Columns columns={columns} mutate={mutate} />
        <button onClick={handleModalOpen}>새로운 칼럼 추가하기</button>
      </div>
    </>
  );
}
