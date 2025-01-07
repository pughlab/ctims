import { WidgetProps } from '@rjsf/utils';
import React, { useEffect, useState } from 'react';
import styles from './CtimsInputWithExcludeToggle.module.css';
import { Tooltip } from 'primereact/tooltip';
import { Dropdown } from 'primereact/dropdown';
import cn from 'clsx';
import IOSSwitch from '../components/IOSSwitch';

const CtimsDropdownWithExcludeToggle = (props: WidgetProps) => {
  let {
    id,
    placeholder,
    required,
    readonly,
    disabled,
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

  const [valueState, setValueState] = useState(value?.replace('!', '') || '');
  const [isNegated, setIsNegated] = useState(value?.startsWith('!') || false);

  useEffect(() => {
    const currentURL = window.location.href;
    if (label === 'Trial ID' && currentURL.includes('/trials/create')) {
      onChange('');
    }
  }, []);

  const dropdownOptions =
    options.enumOptions
      ?.filter((opt: any) => !opt.value.startsWith('!'))
      .map((opt: any) => ({
        label: opt.label || opt.value,
        value: opt.value,
      })) || [];

  const getBackendValue = (displayValue: string, negated: boolean) =>
    negated ? `!${displayValue}` : displayValue;

  const handleDropdownChange = (e: { value: any }) => {
    const selectedValue = e.value;
    setValueState(selectedValue);
    const backendValue = getBackendValue(selectedValue, isNegated);
    onChange(backendValue);
  };

  const handleToggleChange = (checked: boolean) => {
    setIsNegated(checked);
    const backendValue = getBackendValue(valueState, checked);
    onChange(backendValue);
  };

  const handleBlur = () => {
    const trimmedValue = valueState?.trim?.();
    const backendValue = getBackendValue(trimmedValue, isNegated);
    onChange(backendValue);
    onBlur(id, trimmedValue);
  };

  const handleFocus = () => onFocus(id, valueState);

  const labelValue = uiSchema?.['ui:title'] || schema.title || label;
  const questionMarkStyle = `input-target-icon ${styles['question-mark']} pi pi-question-circle .question-mark-target `;

  return (
    <div className={styles.container}>
      <div className={styles['label-container']}>
        {labelValue && <span className={styles.label}>{labelValue}</span>}
        <Tooltip target=".input-target-icon" />
        {schema.description && (
          <i
            className={questionMarkStyle}
            data-pr-tooltip={schema.description}
            data-pr-position="top"
          ></i>
        )}
      </div>

      <Dropdown
        id={id}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        className={cn('w-full', rawErrors.length > 0 ? 'p-invalid' : '')}
        options={dropdownOptions}
        value={valueState}
        onChange={handleDropdownChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        appendTo='self'
      />

      <div style={{ display: 'flex' }}>
        <div className={styles.label}>Exclude this criteria from matches.</div>
        <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
          <IOSSwitch
            disabled={!valueState}
            value={isNegated}
            onChange={handleToggleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CtimsDropdownWithExcludeToggle;
