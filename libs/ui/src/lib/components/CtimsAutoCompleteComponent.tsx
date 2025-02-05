import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Tooltip } from 'antd';
import styles from "./CtimsAutoCompleteComponent.module.css";
import useGetGenes from '../../../../../apps/web/hooks/useGetGenes';
import IOSSwitch from '../components/IOSSwitch';

const AutocompleteField = ({ onChange, ...props }) => {
  const { filteredHugoSymbols, loading, searchSymbols } = useGetGenes();
  const [selectedHugoSymbol, setSelectedHugoSymbol] = useState<string>(props.value ? props.value.replace('!', '') : '');
  const [excludeToggle, setExcludeToggle] = useState<boolean>(props.value ? props.value.startsWith('!') : false);

  useEffect(() => {
    if (props.value) {
      const isExcluded: boolean = props.value.startsWith('!');
      setSelectedHugoSymbol(props.value.replace('!', ''));
      setExcludeToggle(isExcluded);
    }
    else {
      setSelectedHugoSymbol('');
      setExcludeToggle(false);
    }
  }, [props.value]);

  const handleInputChange = (e: { value: string }) => {

    const trimmedValue = e.value.trim();
    trimmedValue !== "" ?
      (setSelectedHugoSymbol(trimmedValue), onChange(trimmedValue)) :
      (setSelectedHugoSymbol(""), onChange(undefined));
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

  const handleToggleChange = (checked: boolean) => {
    setExcludeToggle(checked);
    const newValue = checked ? `!${selectedHugoSymbol}` : selectedHugoSymbol.replace('!', '');
    onChange(newValue);
  };

  const questionMarkStyle = `dropdown-target-icon ${styles['question-mark']} pi pi-question-circle question-mark-target `;

  return (
    <div className={styles.container}>
      {props.schema.title && (
        <label style={labelStyle}>
          {props.schema.title}
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
        completeMethod={(e) => {
          const trimmedValue = e.query.trim();
          trimmedValue === ""
            ? []
            : (setSelectedHugoSymbol(trimmedValue), onChange(trimmedValue), searchSymbols(trimmedValue));
        }}
        onChange={(e) => {
          handleInputChange(e)
        }}
        appendTo='self'
      />
      <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
        <div className={styles.label}>Exclude this criteria from matches.</div>
        <div style={{ marginLeft: 'auto' }}>
          <IOSSwitch
            disabled={!selectedHugoSymbol}
            value={excludeToggle}
            onChange={handleToggleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AutocompleteField;
