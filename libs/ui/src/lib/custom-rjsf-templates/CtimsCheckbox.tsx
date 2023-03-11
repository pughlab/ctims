import { WidgetProps } from "@rjsf/utils";
import { Checkbox, CheckboxChangeParams } from "primereact/checkbox";
import React from "react";

const CtimsCheckboxWidget = (props: WidgetProps) => {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    schema,
    onChange,
  } = props;

  const _onChange = ({ checked }: CheckboxChangeParams) => {
    return onChange(checked ? 'Y' : 'N')
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: "row",
    marginLeft: '0.5rem',
    marginTop: '24px',
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

  const labelStyle: React.CSSProperties = {
    marginLeft: '0.5rem',
    marginBottom: '7px',
    marginTop: '7px',
  }

  const checkboxStyle: React.CSSProperties = {
    marginBottom: '7px',
    marginTop: '7px',
  }

  const desc = label || schema.description;
  return (
    <div style={containerStyle}>
      <Checkbox
        style={checkboxStyle}
        inputId={id}
        checked={value === 'Y'}
        required={required}
        disabled={disabled || readonly}
        onChange={_onChange}
      />
        <label htmlFor={id} style={labelStyle}>{desc}</label>
        {!required && ( <span style={optionalLabelStyle}>Optional</span> )}
    </div>
  );
};

export default CtimsCheckboxWidget;
