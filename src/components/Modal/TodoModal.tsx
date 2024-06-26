import styles from "./TodoModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import DateInput from "../Input/DateInput";
import TagInput from "../Input/TagInput";
import ImageInput from "../Input/ImageInput";
import UserInput from "../Input/UserInput";
import { useForm } from "react-hook-form";
import { createCard, updateCard } from "../../api/card";
import { CardType } from "../../interface/DashboardType";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "../Button/BaseButton/BaseButton";

interface TodoCreateModalProps {
  handleModalClose: () => void;
  dashboardId?: number;
  columnId: number;
  cardData?: CardType;
  type?: string;
}

function TodoCreateModal({
  handleModalClose,
  dashboardId,
  columnId,
  cardData,
  type,
}: TodoCreateModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      assigneeUserId: cardData?.assignee.id || "",
      title: cardData?.title || "",
      description: cardData?.description || "",
      tags: cardData?.tags || [],
      imageUrl: cardData?.imageUrl || "",
    },
  });

  const managerValidation = register("assigneeUserId", {
    required: {
      value: true,
      message: "담당자를 선택해 주세요",
    },
  });

  const titleValidation = register("title", {
    required: {
      value: true,
      message: "제목을 입력해 주세요",
    },
  });

  const descriptionValidation = register("description", {
    required: {
      value: true,
      message: "설명을 입력해 주세요",
    },
  });

  const tagValidation = register("tags");

  const imageValidation = register("imageUrl");
  const queryClient = useQueryClient();
  const onSubmit = async (e: any) => {
    //카드 수정
    if (type && cardData?.id) {
      const response = await updateCard(e, columnId, cardData?.id);
      if (typeof response === "string") {
        toast.error(response);
      } else {
        toast.success("할 일이 수정되었습니다.");
        await queryClient.invalidateQueries({
          queryKey: ["column", columnId + ""],
        });
        handleModalClose();
      }
    }

    // 새로운 카드 생성
    if (dashboardId && columnId) {
      //리스폰스 값
      const response = await createCard(e, dashboardId, columnId);
      if (typeof response === "string") {
        toast.error(response);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["column", columnId + ""],
        });
        handleModalClose();
      }
    }
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title={type || "할 일 생성"}>
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <UserInput
            label="담당자"
            placeholder="이름을 입력해 주세요"
            validation={managerValidation}
            setValue={setValue}
            errors={errors}
            value={cardData?.assignee.nickname}
          />
          <CommonInput
            label="제목"
            name="title"
            placeholder="제목을 입력해 주세요"
            validation={titleValidation}
            errors={errors}
            required={true}
          />
          <CommonInput
            label="설명"
            name="description"
            placeholder="설명을 입력해 주세요"
            validation={descriptionValidation}
            errors={errors}
            required={true}
          />
          <DateInput
            label="마감일"
            placeholder="날짜를 입력해 주세요"
            control={control}
            setValue={setValue}
            value={cardData?.dueDate}
          />
          <TagInput
            label="태그"
            placeholder="입력 후 Enter"
            validation={tagValidation}
            setValue={setValue}
            getValues={getValues}
            value={cardData?.tags || []}
          />
          <ImageInput
            label="이미지"
            validation={imageValidation}
            setValue={setValue}
            columnId={columnId || 0}
            value={cardData?.imageUrl}
          />
          <div className={styles.modal_buttons}>
            <Button.ModalColor type="submit">
              {type ? "수정" : "생성"}
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

export default TodoCreateModal;
