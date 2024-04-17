import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./UserInput.module.css";
import { CommonInputType } from "../../interface/Input";

function UserInput({
  label,
  inputOnChange,
  placeholder,
  value,
  required,
}: CommonInputType) {
  const ref = useRef<HTMLDivElement>(null);
  const [openDropBox, setOpenDropBox] = useState(false);
  //비교할값
  const userData = ["윤병현", "안주언", "류광현", "이진우"];
  //초기값
  const [filterData, setFilterData] = useState<string[]>([
    "윤병현",
    "안주언",
    "류광현",
    "이진우",
  ]);
  //선택된 값
  const [selected, setSelected] = useState("");

  const onChange = (e: any) => {
    e.preventDefault();
    setOpenDropBox(true);
    setSelected(e.target.value);
    const res = userData.filter((data) => data.includes(e.target.value));
    setFilterData(res);
  };

  const selectedHandler = (name: string) => {
    setSelected(name);
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
          value={selected}
        />
        <img
          src="/Icons/arrow_drop.svg"
          alt="drop"
          onClick={() => setOpenDropBox((prev) => !prev)}
        />
      </div>
      {openDropBox && (
        <ul className={styles.content_dropbox}>
          {filterData.map((data, i) => (
            <li
              className={styles.content_dropbox_item}
              key={i}
              onClick={() => selectedHandler(data)}
            >
              <div className={styles.imageArea}>
                {selected === data && (
                  <img src="/Icons/check.svg" alt="ckeck" />
                )}
              </div>
              <div>
                <span>윤</span>
                <p>{data}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserInput;
