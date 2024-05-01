import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Tooltip } from 'antd';
import styles from "./CtimsAutoCompleteComponent.module.css";
import useGetGenes from '../../../../../apps/web/hooks/useGetGenes';
const AutocompleteField = ({ onChange, ...props }) => {
  const { filteredHugoSymbols, loading, searchSymbols } = useGetGenes();
  const [selectedHugoSymbol, setSelectedHugoSymbol] = useState([props.value]);
  console.log("Props",props.value);

useEffect(() => {
  setSelectedHugoSymbol([props.value]);
}, [props.options.
  autoCompleteKey]);


  const handleInputChange = (e:  {value: string}) => {

    console.log("Check1");
    const trimmedValue = e.value.replace(/^\s+/, '');
    if (trimmedValue !== "") {
      setSelectedHugoSymbol(trimmedValue);
      onChange(trimmedValue);
    }
    else {
      setSelectedHugoSymbol("");
      onChange("");
    }

  };


  const arrayContainer = {
    // width: '640px',
    flexGrow: 1,
    minWidth: 0,
    marginLeft: 'auto',
  };

  const labelStyle = {
    height: '36px',
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '7px',
    color: '#495057',
  };


  const questionMarkStyle = `dropdown-target-icon ${styles['question-mark']} pi pi-question-circle question-mark-target `;

  return (
    <div className={styles.container}>
      {props.schema.title && (
        <label style={labelStyle}>
          Hugo Symbol
          <Tooltip>
            <i
              className={questionMarkStyle}
              data-pr-tooltip={props.schema.description}
              data-pr-position="top"
            ></i>
          </Tooltip>
        </label>
      )}
      <AutoComplete
        inputStyle={arrayContainer}
        value={props.value}
        suggestions={filteredHugoSymbols}
        completeMethod={(e) => {
          console.log(" selectedHugoSymbol inside completeMethod ", e);
          const trimmedValue = e.query.replace(/^\s+/, '');
          if (trimmedValue === "") {
            
            return [];
          } else {
            setSelectedHugoSymbol(trimmedValue);
            onChange(trimmedValue);
            return searchSymbols(trimmedValue);
          }
        }}
        onChange={(e) => {
         handleInputChange(e)
        }}
        id={props.options.
          autoCompleteKey}
      />
    </div>
  );
};

export default AutocompleteField;
