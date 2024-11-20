import React from 'react';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import styles from "./CtimsDropdown.module.css";
import { WidgetProps } from "@rjsf/utils";
import { Tooltip } from "primereact/tooltip";

const CtimsCalendar: React.FC<WidgetProps> = (props: any) => {
  const { id, value, disabled, placeholder, onChange, onBlur, onFocus, label, required, schema, rawErrors = [] } = props;
  const labelValue = label || schema.title;
  const questionMarkStyle = `dropdown-target-icon ${styles['question-mark']} pi pi-question-circle .question-mark-target `;

  const handleChange = (e: CalendarChangeParams) => {
    const dateValue = e.value as Date | null;
    if (onChange) {
      console.log("dateValue", dateValue);
      onChange(dateValue ? dateValue.toISOString() : null);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(id, value);
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus(id, value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['label-container']}>
        {labelValue && (
          <span className={styles.label}>{labelValue}</span>
        )}
        <Tooltip target=".dropdown-target-icon" />
        {schema.description && (
          <i className={questionMarkStyle} data-pr-tooltip={schema.description} data-pr-position="top"></i>
        )}
      </div>
      <Calendar
        id={id}
        value={value ? new Date(value as string) : null}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        showTime={false}
        showIcon={true}
        dateFormat="yy-mm-dd"
        className={rawErrors.length > 0 ? "is-invalid" : ""}
      />
    </div>
  );
};

export default CtimsCalendar;
