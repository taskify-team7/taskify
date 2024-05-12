import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import styles from "./ColumnCreatemodal.module.css";
import { useForm } from "react-hook-form";
import { createColumn } from "../../api/column";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "../Button/BaseButton/BaseButton";

interface columnCreateModalProps {
  handleModalClose: () => void;
  dashboardId: number;
}

function ColumnCreateModal({
  handleModalClose,
  dashboardId,
}: columnCreateModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const titleValidation = register("title", {
    required: {
      value: true,
      message: "제목을 입력해 주세요",
    },
  });

  const onSubmit = async (e: any) => {
    const response = await createColumn(e.title, dashboardId);
    if (typeof response === "string") {
      toast.error(response);
    } else {
      toast.success("새로운 컬럼이 생성되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: ["columns", dashboardId + ""],
      });
      handleModalClose();
    }
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="새 컬럼 생성">
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            label="이름"
            name="title"
            placeholder="새로운 프로젝트"
            validation={titleValidation}
            errors={errors}
          />
          <div className={styles.modal_buttons}>
            <Button.ModalColor type="submit" disabled={isSubmitting}>
              생성
            </Button.ModalColor>
            <Button.ModalCancel type="button" onClick={handleModalClose}>
              취소
            </Button.ModalCancel>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default ColumnCreateModal;
