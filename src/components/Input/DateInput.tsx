import React, { useState } from "react";
import styles from "./DateInput.module.css";
import { CommonInputType } from "../../interface/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function DateInput({ label, inputOnChange, placeholder }: CommonInputType) {
  const [startDate, setStartDate] = useState("");

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const onChange = (date: Date | null) => {
    const formattedDate = format(date || new Date(), "yyyy-MM-dd HH:mm");
    setStartDate(formattedDate);
  };

  return (
    <div className={styles.content}>
      <label htmlFor="name" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_date}>
        <img src="/Icons/calendar.svg" alt="date" />
        <DatePicker
          id={label}
          placeholderText={placeholder}
          className={styles.content_date_input}
          selected={startDate ? new Date(startDate) : new Date()}
          onChange={(date) => onChange(date)}
          showTimeSelect
          filterTime={filterPassedTime}
          dateFormat="Pp"
        />
        {/* <input
          id="name"
          type="text"
          placeholder={placeholder}
          className={styles.content_date_input}
          onChange={inputOnChange}
        /> */}
      </div>
    </div>
  );
}

export default DateInput;
