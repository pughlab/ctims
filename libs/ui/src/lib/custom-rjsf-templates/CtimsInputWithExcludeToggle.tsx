import { WidgetProps } from '@rjsf/utils';
import React, { useEffect, useState } from 'react';
import styles from './CtimsInputWithExcludeToggle.module.css';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import cn from 'clsx';
import IOSSwitch from '../components/IOSSwitch';


const CtimsInputWithExcludeToggle = (props: WidgetProps) => {
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

  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    const currentURL = window.location.href;

    if (label === 'Trial ID' && currentURL.includes('/trials/create')) {
      onChange('')
    }
  }, [])

  useEffect(() => {
    console.log('value', value)
  }, [value])


  const _onChange = ({
                       target: { value },
                     }: React.ChangeEvent<HTMLInputElement>) => {
    console.log('value', value)
    setValueState(value)
    // return onChange(value === "" ? options.emptyValue : value)
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
        value={value || value === 0 ? value.replace('!', '') : ""}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />
      <div style={{ display: 'flex' }}>
        <div className={styles.label}> Exclude this diagnosis from matches </div>
        <div style={{marginLeft: 'auto', marginTop: '10px'}}><IOSSwitch value={value ? value.startsWith('!') : false} onChange={(checked: boolean) => {
          const newValue = checked ? '!' + value : value.replace('!', '');
          onChange(newValue);
        }} /></div>
      </div>
    </div>
  );
}
export default CtimsInputWithExcludeToggle;
