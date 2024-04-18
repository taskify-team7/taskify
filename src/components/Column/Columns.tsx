// @ts-nocheck
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useQueries,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { changeCard, getCards, getColumns } from "../../api/dashboard";
import styles from "./Columns.module.css";

export default function Columns() {
  const { id = "" } = useParams(); // 대시보드 id
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: columns, error } = useQuery<any>({
    queryKey: ["columns", id],
    queryFn: () => getColumns(id),
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
    console.log(wow.data);
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
    <DragDropContext
      onDragEnd={({ source, destination, draggableId }) => {
        if (destination === undefined || destination === null) return null;
        if (source.droppableId === destination.droppableId) return null;
        mutate({ source, destination, draggableId });
      }}
    >
      {columns?.map((col: any, index) => (
        <div key={col.id} className={styles.column}>
          <div>{col.title}</div>
          <Droppable key={col.id + ""} droppableId={col.id + ""}>
            {(provided) => (
              <div
                className={styles.cards}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {(
                  queryClient.getQueryData<any[]>(["column", col.id + ""]) || []
                ).map((card: any, i: any) => (
                  <Draggable key={card.id} draggableId={card.id + ""} index={i}>
                    {(provided) => (
                      <div
                        className={styles.card}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {card.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
}
