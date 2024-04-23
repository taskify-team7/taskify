import styles from "./DateInput.module.css";
import { DateInputType } from "../../interface/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

function DateInput({ label, control, setValue, value }: DateInputType) {
  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const defaultDate = new Date();

  return (
    <div className={styles.content}>
      <label htmlFor="name" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_date}>
        <img src="/Icons/calendar.svg" alt="date" />
        <Controller
          name="dueDate"
          defaultValue={value || format(defaultDate, "yyyy-MM-dd HH:mm")}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker
              ref={ref}
              placeholderText="날짜를 입력해 주세요"
              className={styles.content_date_input}
              selected={value ? new Date(value) : new Date()}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeSelect
              onChange={(date: Date) => {
                const formattedDate = format(
                  date || new Date(),
                  "yyyy-MM-dd HH:mm"
                );
                setValue("dueDate", formattedDate);
              }}
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
