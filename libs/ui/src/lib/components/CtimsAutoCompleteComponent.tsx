import React, { useState, useMemo } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';
import {getTemplate, getUiOptions, ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps} from "@rjsf/utils";
import { Tooltip } from 'antd';
import styles from "./CtimsAutoCompleteComponent.module.css";
import useGetGenes from '../../../../../apps/web/hooks/useGetGenes'; 

const AutocompleteField = ({ onChange, ...props }) => {
  const { filteredHugoSymbols, loading, searchSymbols } = useGetGenes();
  const [selectedHugoSymbol, setSelectedHugoSymbol] = useState([]);

  const arrayContainer = {
    width: '640px',
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
    <div>
      {props.schema.title && (
        <label style={labelStyle}>
          Hugo Gene
          <Tooltip title={props.schema.description} placement="topLeft">
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
        loading={loading}
      />
    </div>
  );
};

export default AutocompleteField;