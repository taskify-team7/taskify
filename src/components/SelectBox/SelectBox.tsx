import React from "react";
import useSelect from "../../hooks/useSelect";
import { MembersType } from "../../interface/ModalType";

interface SelectBoxProps {
  label: string;
  placeholder: string;
  data: MembersType[];
}

function SelectBox({ label, data, placeholder }: SelectBoxProps) {
  const { ref, isSelectOpen, selected, selectToggleHandler, selectedHandler } =
    useSelect();
  return (
    <>
      <label>{label}</label>
      <div ref={ref}>
        <div>{placeholder}</div>
        <img src="/Icons/arrow_drop.svg" alt="drop-btn" />
        {isSelectOpen && (
          <div>
            <div>test</div>
          </div>
        )}
      </div>
    </>
  );
}

export default SelectBox;
