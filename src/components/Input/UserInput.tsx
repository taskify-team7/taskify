import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./UserInput.module.css";
import { CommonInputType } from "../../interface/Input";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MembersType } from "../../interface/ModalType";
import ProfileCircle from "../ProfileCircle/ProfileCircle";

function UserInput({
  label,
  placeholder,
  validation,
  setValue,
  value,
}: CommonInputType) {
  const { id = null } = useParams();
  const userQueryClient = useQueryClient();
  const userData = userQueryClient.getQueryData([
    "members",
    id,
  ]) as MembersType[];
  const ref = useRef<HTMLDivElement>(null);
  // 드롭박스 열고 닫는 상태값
  const [openDropBox, setOpenDropBox] = useState(false);
  //초기값
  const [filterData, setFilterData] = useState(userData);
  //input State
  const [inputState, setInputState] = useState(value);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOpenDropBox(true);

    const res = userData.filter((data) =>
      data.nickname.includes(e.target.value)
    );
    setInputState(e.target.value);
    setFilterData(res);

    if (e.target.value === res[0]?.nickname) {
      setValue("assigneeUserId", res[0]?.userId);
    }
  };

  const selectedHandler = (id: number, name: string) => {
    setInputState(name);

    setValue("assigneeUserId", id);
    setOpenDropBox(false);
  };

  const handleClickOutside = useCallback(
    (evnet: MouseEvent) => {
      if (!ref.current) return;

      const inside = ref.current.contains(evnet.target as Node);
      if (!inside) setOpenDropBox(false);
    },
    [setOpenDropBox, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as any);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.content} ref={ref}>
      <label htmlFor="user" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_user}>
        <input
          id="user"
          type="text"
          placeholder={placeholder}
          className={styles.content_user_input}
          onChange={onChange}
          onClick={() => setOpenDropBox(true)}
          value={inputState}
          autoComplete="off"
          {...validation?.ref}
        />
        <img
          src="/Icons/arrow_drop.svg"
          alt="drop"
          onClick={() => setOpenDropBox((prev) => !prev)}
        />
      </div>
      {openDropBox && filterData.length > 0 && (
        <ul className={styles.content_dropbox}>
          {filterData.map((data, i) => (
            <li
              className={styles.content_dropbox_item}
              key={i}
              onClick={() => selectedHandler(data.userId, data.nickname)}
            >
              <div className={styles.imageArea}>
                {inputState === data.nickname && (
                  <img src="/Icons/check.svg" alt="ckeck" />
                )}
              </div>
              <div>
                <ProfileCircle
                  profileImageUrl={data.profileImageUrl}
                  nickname={data.nickname}
                  type="card"
                />
                <p>{data.nickname}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserInput;
