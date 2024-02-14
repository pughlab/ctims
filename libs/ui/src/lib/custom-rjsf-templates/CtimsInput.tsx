import {WidgetProps} from "@rjsf/utils";
import React, {useEffect} from "react";
import cn from "clsx";
import {InputText} from "primereact/inputtext";
import { Tooltip } from 'primereact/tooltip';
import styles from "./CtimsInput.module.css";
import {protein_change_validation_func, wildcard_protein_change_validation_func} from "../components/helpers";
import { v4 as uuidv4 } from 'uuid';

const CtimsInput = (props: WidgetProps) => {
    let {
        id,
        name,
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

    const [wildProteinError, setWildProteinError] = React.useState(false);
    const [proteinChangeError, setProteinChangeError] = React.useState(false);

    useEffect(() => {
      const currentURL = window.location.href;

      if (label === 'Nickname' && currentURL.includes('/trials/create')) {
       onChange('')
      }

      // needed uuid to tie the matching criteria to the arm after arm code became optional
      if (name === 'uuid') {
        value = uuidv4()
        onChange(value)
      }
    }, [])

  const getValue = () => {
      let r;
      if (name  === 'uuid') {
        r = uuidv4()
      } else {
        r = value || value === 0 ? value : ""
      }
      return r;
  }

  useEffect(() => {
    if (name === 'wildcard_protein_change') {
      if (!wildcard_protein_change_validation_func(value)) {
        setWildProteinError(true)
      } else {
        setWildProteinError(false)
      }
    }
    if (name === 'protein_change') {
      if (!protein_change_validation_func(value)) {
        setProteinChangeError(true)
      } else {
        setProteinChangeError(false)
      }
    }
  }, [value]);

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
        <div className={name === 'uuid' ? styles.uuidInput : styles.container}>
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
                className={cn("w-full", wildProteinError || proteinChangeError ? "p-invalid" : "")}
                list={schema.examples ? `examples_${id}` : undefined}
                type={inputType}
                value={getValue()}
                onChange={_onChange}
                onBlur={_onBlur}
                onFocus={_onFocus}
            />
        </div>
    );
}
export default CtimsInput;
