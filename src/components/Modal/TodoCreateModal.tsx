import styles from "./TodoCreateModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import DateInput from "../Input/DateInput";
import TagInput from "../Input/TagInput";
import ImageInput from "../Input/ImageInput";
import UserInput from "../Input/UserInput";
import { useForm } from "react-hook-form";
import { createCard } from "../../api/dashboard";

interface TodoCreateModalProps {
  handleModalClose: () => void;
  dashboardId?: number;
  columnId?: number;
}

function TodoCreateModal({
  handleModalClose,
  dashboardId,
  columnId,
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
      title: "",
      description: "",
      tags: [],
      imageUrl: "",
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

  const onSubmit = async (e: any) => {
    if (dashboardId && columnId) {
      //리스폰스 값
      const res = await createCard(e, dashboardId, columnId);
      handleModalClose();
    }
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="할 일 생성">
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <UserInput label="담당자" placeholder="이름을 입력해 주세요" />
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
          />
          <TagInput
            label="태그"
            placeholder="입력 후 Enter"
            validation={tagValidation}
            setValue={setValue}
            getValues={getValues}
          />
          <ImageInput
            label="이미지"
            validation={imageValidation}
            setValue={setValue}
            columnId={columnId || 0}
          />
          <div className={styles.modal_buttons}>
            <button className={styles.a_button}>생성</button>
            <button className={styles.c_button} onClick={handleModalClose}>
              취소
            </button>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default TodoCreateModal;
