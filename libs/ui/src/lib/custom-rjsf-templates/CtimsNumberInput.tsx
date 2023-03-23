import {WidgetProps} from "@rjsf/utils";
import React from "react";
import cn from "clsx";
import {InputText} from "primereact/inputtext";
import { Tooltip } from 'primereact/tooltip';
import styles from "./CtimsInput.module.css";

const CtimsNumberInput = (props: WidgetProps) => {
  let {
    id,
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
    rawErrors = [],
  } = props;

  const _onChange = ({
                       target: { value },
                     }: React.ChangeEvent<HTMLInputElement>) => {
    console.log('registry', props.registry)
    return onChange(value === "" ? options.emptyValue : value)
  };
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value);
  const _onFocus = ({
                      target: { value },
                    }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);
  const inputType = (type || schema.type) === "string" ? "text" : `${type || schema.type}`
  const labelValue = uiSchema?.["ui:title"] || schema.title || label;

  const questionMarkStyle = `input-target-icon ${styles['question-mark']} pi pi-question-circle .question-mark-target `;

  return (
    <div className={styles.container}>
      <div className={styles['label-container']}>
        {labelValue && (
          <span className={styles.label}>{labelValue}</span>
        )}
        <Tooltip target=".input-target-icon" />
        {schema.description && (
          <i className={questionMarkStyle} data-pr-tooltip={schema.description} data-pr-position="top"></i>
        )}
        {!required && ( <span className={styles['optional-label']}>Optional</span> )}
      </div>

      <InputText
        keyfilter="int"
        id={id}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        // className={cn("w-full", rawErrors.length > 0 ? "p-invalid" : "")}
        className={cn("w-full")}
        list={schema.examples ? `examples_${id}` : undefined}
        type={inputType}
        value={value || value === 0 ? value : ""}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />
    </div>
  );
}
export default CtimsNumberInput;
