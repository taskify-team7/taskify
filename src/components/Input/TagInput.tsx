import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./TagInput.module.css";
import { TagInputType } from "../../interface/Input";

interface TagListType {
  color: string;
  text: string;
}

function TagInput({
  label,
  placeholder,
  validation,
  setValue,
  getValues,
}: TagInputType) {
  const colorList = ["F9EEE3", "E7F7DB", "F7DBF0", "DBE6F7"];
  const [tagList, setTagList] = useState<TagListType[]>([]);

  //이 컴포넌트에서만 사용하는 인풋 상태
  const [inputState, setInputState] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const onKeyboardAction = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      e.preventDefault(); // 이벤트의 기본 동작 막기

      const inputValue = e.currentTarget.value.trim();
      // 한글 입력 오류 해결 조건문
      if (inputValue.trim() !== "" && !e.nativeEvent.isComposing) {
        //랜덤 색상 값
        const randoColorIndex = Math.floor(Math.random() * colorList.length);
        setTagList((prev) => [
          ...prev,
          { color: colorList[randoColorIndex], text: inputValue },
        ]);
        const previousTags = getValues("tags");
        setValue("tags", [...previousTags, inputValue]);
        setInputState("");
      }
    }

    if (e.key === "Backspace" && inputState === "") {
      // 백스페이스 키를 입력할 때 inputState가 비어있으면
      // tagList에서 맨 뒤의 요소를 지움
      setTagList((prev) => {
        const newTagList = [...prev];
        newTagList.pop();
        return newTagList;
      });
    }
  };

  const delteTag = (clickedTag: TagListType) => {
    const newTagList = tagList.filter((tag) => tag !== clickedTag);
    setTagList(newTagList);
  };

  return (
    <div className={styles.content}>
      <label htmlFor="tag" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_tag}>
        <div className={styles.tagList}>
          {tagList.map((tag, i) => (
            <div
              className={`${styles.tag} ${styles[tag.color]}`}
              key={i}
              onClick={() => delteTag(tag)}
            >
              {tag.text}
            </div>
          ))}
        </div>
        <input
          id="tag"
          type="text"
          placeholder={placeholder}
          className={styles.content_input}
          onChange={onChange}
          onKeyDown={onKeyboardAction}
          value={inputState}
          {...validation?.ref}
        />
      </div>
    </div>
  );
}

export default TagInput;
