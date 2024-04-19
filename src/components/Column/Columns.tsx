import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./Columns.module.css";

export default function Columns({
  columns,
  mutate,
}: {
  columns: any[];
  mutate: (arg0: object) => void;
}) {
  const queryClient = useQueryClient();
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
