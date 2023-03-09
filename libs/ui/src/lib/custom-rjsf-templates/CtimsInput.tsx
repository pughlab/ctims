import {WidgetProps} from "@rjsf/utils";
import React from "react";
import cn from "clsx";
import {InputText} from "primereact/inputtext";

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: "column",
}

const labelContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: "row",
}

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  marginBottom: '7px',
  marginTop: '7px',
}

const optionalLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  marginBottom: '7px',
  marginTop: '7px',
  marginLeft: 'auto',
  color: 'rgba(0, 0, 0, 0.6)'
}

const CtimsInput = (props: WidgetProps) => {
    const {
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
    // console.log('CtimsInput onChange', props)
      return onChange(value === "" ? options.emptyValue : value)
    };
    const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
        onBlur(id, value);
    const _onFocus = ({
                          target: { value },
                      }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);
    const inputType = (type || schema.type) === "string" ? "text" : `${type || schema.type}`
    const labelValue = uiSchema?.["ui:title"] || schema.title || label;



    return (
        <div style={containerStyle}>
          <div style={labelContainerStyle}>
            {labelValue && (
              <span style={labelStyle}>{labelValue}</span>
            )}
            {!required && ( <span style={optionalLabelStyle}>Optional</span> )}
          </div>

          {/*{required ? 'required' : 'not required'}*/}
            <InputText
                id={id}
                placeholder={placeholder}
                autoFocus={autofocus}
                required={required}
                disabled={disabled}
                readOnly={readonly}
                className={cn("w-full", rawErrors.length > 0 ? "p-invalid" : "")}
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
export default CtimsInput;
