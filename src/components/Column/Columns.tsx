// @ts-nocheck
import { DragDropContext } from "react-beautiful-dnd";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { changeCard } from "../../api/dashboard";
import Column from "./Column";
import { CardType, ColumnType } from "../../interface/DashboardType";

export default function Columns({
  columns,
  allCards,
}: {
  columns: ColumnType[];
  allCards: CardType[];
}) {
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
      queryClient.invalidateQueries({
        queryKey: ["column", source.droppableId],
      });
      queryClient.invalidateQueries({
        queryKey: ["column", destination.droppableId],
      });
    },
  });
  return (
    <DragDropContext
      onDragEnd={({ source, destination, draggableId }) => {
        if (destination === undefined || destination === null) return null;
        if (source.droppableId === destination.droppableId) return null;
        moveCard({ source, destination, draggableId });
      }}
    >
      {columns?.map((col: ColumnType, index) => (
        <Column key={col.id} col={col} />
      ))}
    </DragDropContext>
  );
}
