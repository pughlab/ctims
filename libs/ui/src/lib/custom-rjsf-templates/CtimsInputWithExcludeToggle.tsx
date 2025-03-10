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

  const [valueState, setValueState] = useState(value ? value.replace(/^!/, '') : '');
  const [excludeToggle, setExcludeToggle] = useState(value ? value.startsWith('!') : false);

  useEffect(() => {
    const currentURL = window.location.href;

    if (label === 'Trial ID' && currentURL.includes('/trials/create')) {
      onChange('')
    }
  }, [])

  useEffect(() => {
    if (value) {
      setValueState(value.replace(/^!/, ''));
      setExcludeToggle(value.startsWith('!'));
    } else {
      setValueState('');
      setExcludeToggle(false);
    }
  }, [value]);

  const handleToggleChange = (checked: boolean) => {
    setExcludeToggle(checked);
    const newValue = checked ? `!${valueState}` : valueState;
    onChange(newValue === '' ? options.emptyValue : newValue);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    isBlur: boolean = false
  ) => {
    const newValue = event.target.value.trim();
    if (newValue.startsWith('!') && value?.startsWith('!')) {
      setValueState(newValue.replace(/^!/, ''));
    } else {
      setValueState(newValue);
      const actualValue = excludeToggle ? `!${newValue}` : newValue;
      onChange(actualValue === '' ? options.emptyValue : actualValue);
      if (isBlur) {
        onBlur(id, actualValue);
      }
    }
  };
  
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
        value={valueState}
        onChange={(event) => handleChange(event)}
        onBlur={(event) => handleChange(event, true)}
        onFocus={_onFocus}
      />
      <div style={{ display: 'flex' }}>
        <div className={styles.label}> Exclude this diagnosis from matches </div>
        <div style={{ marginLeft: 'auto', marginTop: '10px' }}><IOSSwitch
          disabled={!props.value}
          value={excludeToggle}
          onChange={handleToggleChange}
        />
        </div>
      </div>
    </div>
  );
}
export default CtimsInputWithExcludeToggle;
