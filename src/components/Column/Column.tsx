import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./Column.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import TodoModal from "../Modal/TodoModal";
import { useParams } from "react-router-dom";
import { CardType, ColumnType } from "../../interface/DashboardType";
import SettingsSvg from "../../assets/settings.svg";
import ColumnManagementModal from "../Modal/ColumnManagementModal";
import Card from "./Card";

function Column({ col }: { col: ColumnType }) {
  const { id } = useParams();
  const {
    isModalOpen: isCreateModalOpen,
    handleModalOpen: handleCreateModalOpen,
    handleModalClose: handleCreateModalClose,
  } = useModal();
  const {
    isModalOpen: isSettingsModalOpen,
    handleModalOpen: handleSettingsModalOpen,
    handleModalClose: handleSettingsModalClose,
  } = useModal();
  const queryClient = useQueryClient();
  return (
    <>
      {createPortal(
        isCreateModalOpen && (
          <TodoModal
            handleModalClose={handleCreateModalClose}
            dashboardId={Number(id)}
            columnId={col.id}
          />
        ),
        document.body
      )}
      {createPortal(
        isSettingsModalOpen && (
          <ColumnManagementModal
            handleModalClose={handleSettingsModalClose}
            // dashboardId={Number(id)}
            // columnId={col.id}
          />
        ),
        document.body
      )}
      <div className={styles.container}>
        <div className={styles.columnHeader}>
          <div className={styles.titleArea}>
            <div className={styles.dot}></div>
            <div className={styles.title}>{col.title}</div>
            <div className={styles.cardCount}>
              {
                queryClient.getQueryData<CardType[]>(["column", col.id + ""])
                  ?.length
              }
            </div>
          </div>
          <img
            src={SettingsSvg}
            alt="column setting"
            className={styles.settingIcon}
            onClick={handleSettingsModalOpen}
          />
        </div>
        <Droppable key={col.id + ""} droppableId={col.id + ""}>
          {(provided) => (
            <div
              className={styles["cards-droppableArea"]}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div
                className={styles.createCardButton}
                onClick={handleCreateModalOpen}
              >
                <div className={styles.plusIcon}>+</div>
              </div>
              {(
                queryClient.getQueryData<CardType[]>(["column", col.id + ""]) ||
                []
              ).map((card: CardType, i: any) => (
                <Draggable key={card.id} draggableId={card.id + ""} index={i}>
                  {(provided) => (
                    <div
                      className={styles["card-draggableItem"]}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <Card card={card} columnTitle={col.title} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

export default Column;
