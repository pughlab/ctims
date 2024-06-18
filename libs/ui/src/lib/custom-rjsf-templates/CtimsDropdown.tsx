import { WidgetProps, asNumber, guessType } from "@rjsf/utils";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import React, {useEffect, useState} from "react";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";
import styles from "./CtimsDropdown.module.css";
import {Tooltip} from "primereact/tooltip";

const nums = new Set(["number", "integer"]);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema: any, value: any): number | number[] | boolean | boolean[] | undefined | unknown => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === "") {
    return undefined;
  }
  if (type === "array" && items && nums.has(items.type)) {
    return value.map(asNumber);
  }
  if (type === "boolean") {
    return value === "true";
  }
  if (type === "number") {
    return asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x: any) => guessType(x) === "number")) {
      return asNumber(value);
    }
    if (schema.enum.every((x: any) => guessType(x) === "boolean")) {
      return value === "true";
    }
  }

  return value;
};
const CtimsDropdown = (props: WidgetProps) => {
 const {
   schema,
   id,
   name,
   options,
   label,
   required,
   disabled,
   value,
   uiSchema,
   multiple,
   autofocus,
   onChange,
   onBlur,
   onFocus,
   placeholder,
   rawErrors = [],
 } = props;

 const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    if (name === 'phase' || name === 'age'  ) {
      setIsMultiple(uiSchema!.multiple)
    } else {
      setIsMultiple(false)
    }
  }, [name]);

  const { enumOptions, enumDisabled } = options;
  // console.log('CtimsDropdown options', options);

  const emptyValue = multiple ? [] : "";

  type Option = { label: string; value: any; disabled: boolean };
  const optionsList = (enumOptions as any[]).map(({ label, value }: { label: string; value: any }): Option => {
    const disabled = Array.isArray(enumDisabled) && enumDisabled.includes(value);
    return {
      label,
      value,
      disabled,
    };
  });

  const getValue = (event: MultiSelectChangeParams | DropdownChangeParams) => {
    if (multiple) {
      const value: any[] = Array.isArray((event as MultiSelectChangeParams).value) ?
        (event as MultiSelectChangeParams).value :
        [(event as MultiSelectChangeParams).value];
      return value.map((o: any) => o.value);
    }
    return (event as DropdownChangeParams).value;
  }
  const labelValue = label || schema.title;
  const questionMarkStyle = `dropdown-target-icon ${styles['question-mark']} pi pi-question-circle .question-mark-target `;
  const multiSelectValue = () => {
    if (typeof value === "undefined") {
      return emptyValue;
    }
    const newArr = value.split(' and ');
    return newArr;
  }

  const val = ["I"]

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

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
        {!required && ( <span className={styles['optional-label']}>Optional</span> )}
      </div>
      {isMultiple ? (
        <MultiSelect
          id={id}
          value={multiSelectValue()}
          options={optionsList}
          disabled={disabled}
          placeholder={placeholder}
          className={rawErrors.length > 0 ? "is-invalid" : ""}
          onBlur={
            onBlur &&
            (() => {
              onBlur(id, processValue(schema, value));
            })
          }
          onFocus={
            onFocus &&
            (() => {
              onFocus(id, processValue(schema, value));
            })
          }
          onChange={(event) => {
            const arrToSentence = (arr: string[]) => {
              if (arr.length === 1) {
                return arr[0];
              }
              // Join the array elements with ' and '
              return arr.join(' and ');
            }
            onChange(processValue(schema, arrToSentence(getValue(event))));
          }}
        />
      ) : (
        <Dropdown
          id={id}
          value={typeof value === "undefined" ? emptyValue : value}
          appendTo={'self'}
          options={optionsList}
          required={required}
          disabled={disabled}
          autoFocus={autofocus}
          placeholder={placeholder}
          className={rawErrors.length > 0 ? "is-invalid" : ""}
          onBlur={
            onBlur &&
            (() => {
              onBlur(id, processValue(schema, value));
            })
          }
          onFocus={
            onFocus &&
            (() => {
              onFocus(id, processValue(schema, value));
            })
          }
          onChange={(event) => {
            onChange(processValue(schema, getValue(event)));
          }}
        />
      )}
    </div>
  );
}
export default CtimsDropdown;
