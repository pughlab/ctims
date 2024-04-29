import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Tooltip } from 'antd';
import styles from "./CtimsAutoCompleteComponent.module.css";
import useGetGenes from '../../../../../apps/web/hooks/useGetGenes';

const AutocompleteField = ({ onChange, ...props }) => {
  const { filteredHugoSymbols, loading, searchSymbols } = useGetGenes();
  const [selectedHugoSymbol, setSelectedHugoSymbol] = useState([props.value]);

 useEffect(() => {
  setSelectedHugoSymbol([props.value]);
}, [props.value]);

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
        value={selectedHugoSymbol}
        suggestions={filteredHugoSymbols}
        completeMethod={(e) => searchSymbols(e.query)}
        onChange={(e) => {
          setSelectedHugoSymbol(e.value);
          onChange(e.value);
        }}
      />
    </div>
  );
};

export default AutocompleteField;
