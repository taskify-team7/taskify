// @ts-nocheck
import { DragDropContext } from "react-beautiful-dnd";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { changeCard } from "../../api/dashboard";
import styles from "./DashBoardPage.module.css";
import Columns from "../../components/Column/Columns";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import ColumnCreateModal from "../../components/Modal/ColumnCreateModal";
import { useNavigate, useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getCards, getColumns } from "../../api/dashboard";
import { ColumnType } from "../../interface/DashboardType";
import BaseButton from "../../components/BaseButton/BaseButton";
import AddIcon from "../../assets/addButton.svg";

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

  const queryClient = useQueryClient();
  const { mutate: moveCard } = useMutation({
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
        queryClient.getQueryData<CardType[]>(["column", source.droppableId]) ||
        [];
      const endList =
        queryClient.getQueryData<CardType[]>([
          "column",
          destination.droppableId,
        ]) || [];
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
      // console.log(source.droppableId);
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
      <DragDropContext
        onDragEnd={({ source, destination, draggableId }) => {
          if (destination === undefined || destination === null) return null;
          if (source.droppableId === destination.droppableId) return null;
          moveCard({ source, destination, draggableId });
        }}
      >
        <div className={styles.container}>
          <Columns columns={columns} allCards={allCards} />
          <BaseButton
            onClick={handleModalOpen}
            styleType="addColumnButton"
            text="새로운 칼럼 추가하기"
            rightImage={"addButton"}
          />
        </div>
      </DragDropContext>
    </>
  );
}
