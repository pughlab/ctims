import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';
import {getTemplate, getUiOptions, ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps} from "@rjsf/utils";
import { Tooltip } from 'antd';
import styles from "./CtimsAutoCompleteComponent.module.css";

const AutocompleteField = ({onChange, ...props }: ObjectFieldTemplateProps) => {
      const {
    schema,
  } = props;

  const [filteredHugoSymbols, setFilteredHugoSymbols] = useState([]);
  const [selectedHugoSymbol, setSelectedHugoSymbol] = useState([]);

  const searchSymbols = async (gene) => {
    const query = gene.query;
    try {
    const response = await axios.get(`genes?query=${query}`);
      const symbols = response.data;
      setFilteredHugoSymbols(symbols);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  const arrayContainer: React.CSSProperties = {
    width: '640px',
    marginLeft: 'auto',
  };

  const labelStyle: React.CSSProperties = {
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
      {schema.title && (
        <label style={labelStyle}>
          Hugo Gene
          <Tooltip title={schema.description} placement="topLeft">
            <i className={questionMarkStyle} data-pr-tooltip={schema.description} data-pr-position="top"></i>
          </Tooltip>
        </label>
      )}
      <AutoComplete
        inputStyle={arrayContainer}
        value={selectedHugoSymbol}
        suggestions={filteredHugoSymbols}
        completeMethod={searchSymbols}
        onChange={(e) => {
          setSelectedHugoSymbol(e.value);
          onChange(e.value);
        }}
      />
    </div>
  );
};

export default AutocompleteField;