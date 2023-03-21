import React, {CSSProperties, useState} from "react";
import {Dropdown} from "primereact/dropdown";

interface IOperatorDropdownProps {
  onOperatorChange: (code: string) => void;
}
export const OperatorDropdown = (props: IOperatorDropdownProps) => {
  const { onOperatorChange } = props;
  const [operator, setOperator] = useState({ name: 'AND (if all criteria are met)', code: 'AND' });

  // TODO: make it a template to reflect different font for AND and description
  const dropDownItems = [
    { name: 'AND (if all criteria are met)', code: 'AND' },
    { name: 'OR (if any criteria are met)', code: 'OR' },
  ];

  const onChange = (e: any) => {
    console.log('onOperatorChange', e.value);
    setOperator(e.value);
    onOperatorChange(e.value.code);
  }

  const dropDownStyle: CSSProperties = {
    width: '600px',
    marginLeft: '20px',
    marginRight: '20px',
  }

  const labelStyle: CSSProperties = {
    marginBottom: '7px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
  }

  return (
    <>
      <div style={labelStyle}>Operator</div>
      <Dropdown value={operator}
                style={dropDownStyle}
                options={dropDownItems}
                onChange={onChange}
                optionLabel="name" />
    </>
  )
}
