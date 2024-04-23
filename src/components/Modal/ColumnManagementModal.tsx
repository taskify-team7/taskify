import React from "react";
import styles from "./ColumnManagementModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import { useQueryClient } from "@tanstack/react-query";
import { deleteColumn, updateColumn } from "../../api/dashboard";
import { useForm } from "react-hook-form";

interface ColumnManagementModalProps {
  columnId: number;
  title: string;
  dashboardId: number;
  handleModalClose: () => void;
}

function ColumnManagementModal({
  columnId,
  dashboardId,
  title,
  handleModalClose,
}: ColumnManagementModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: title || "",
    },
  });

  async function handleDelete() {
    await deleteColumn(columnId);
    await queryClient.removeQueries({
      queryKey: ["column", columnId + ""],
      exact: true,
    });
    await queryClient.invalidateQueries({
      queryKey: ["columns", dashboardId + ""],
    });
  }

  const onSubmit = async (e: any) => {
    const res = await updateColumn(columnId, e.title);
    await queryClient.invalidateQueries({
      queryKey: ["columns", dashboardId + ""],
    });
    handleModalClose();
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="컬럼 관리">
        <form className={styles.contents}>
          <CommonInput
            label="이름"
            placeholder="칼럼 이름을 입력하세요"
            validation={register("title", {
              required: true,
            })}
          />
          <div className={styles.modal_buttons}>
            <button className={styles.d_button} onClick={handleDelete}>
              삭제하기
            </button>
            <div>
              <button className={styles.c_button} onClick={handleModalClose}>
                취소
              </button>
              <button
                type="submit"
                className={styles.a_button}
                onClick={handleSubmit(onSubmit)}
              >
                변경
              </button>
            </div>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default ColumnManagementModal;
