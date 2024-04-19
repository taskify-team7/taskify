import styles from "./DateInput.module.css";
import { DateInputType } from "../../interface/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

function DateInput({ label, control }: DateInputType) {
  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className={styles.content}>
      <label htmlFor="name" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_date}>
        <img src="/Icons/calendar.svg" alt="date" />
        <Controller
          name="expiryDate"
          defaultValue={new Date()}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker
              ref={ref}
              placeholderText="날짜를 입력해 주세요"
              className={styles.content_date_input}
              selected={value}
              dateFormat="Pp"
              showTimeSelect
              onChange={onChange}
              onBlur={onBlur}
              filterTime={filterPassedTime}
            />
          )}
        />
      </div>
    </div>
  );
}

export default DateInput;
