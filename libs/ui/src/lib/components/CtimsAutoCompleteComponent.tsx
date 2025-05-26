import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Tooltip } from 'antd';
import styles from "./CtimsAutoCompleteComponent.module.css";
import useGetAutoCompleteData from '../../../../../apps/web/hooks/useGetAutoCompleteData';
import IOSSwitch from '../components/IOSSwitch';
import { auto_complete_symblo_validation_func } from "../components/helpers";
import cn from "clsx";

const AutocompleteField = ({ onChange, ...props }) => {
  const { filteredAutoCompleteSymbols, loading, searchAutoCompleteSymbols } = useGetAutoCompleteData(props.schema.autoCompleteType);
  const [selectedAutoCompleteSymbol, setSelectedAutoCompleteSymbol] = useState<string>(props.value ? props.value.replace('!', '') : '');
  const [excludeToggle, setExcludeToggle] = useState<boolean>(props.value ? props.value.startsWith('!') : false);
  const [autoCompleteSymbolError, setAutoCompleteSymbolError] = React.useState(false);

  useEffect(() => {
    if (props.value) {
      const isExcluded: boolean = props.value.startsWith('!');
      setSelectedAutoCompleteSymbol(props.value.replace('!', ''));
      setExcludeToggle(isExcluded);
    }
    else {
      setSelectedAutoCompleteSymbol('');
      setExcludeToggle(false);
    }
    if (!auto_complete_symblo_validation_func(props.value)) {
      setAutoCompleteSymbolError(true)
    } else {
      setAutoCompleteSymbolError(false)
    }
  }, [props.value]);

  const handleInputChange = (e: { value: string }) => {

    const trimmedValue = e.value.trim();
    //The below check make sures there are no multiple ! in the input string.
    if(trimmedValue.startsWith('!') && props.value?.startsWith('!')){
      setSelectedAutoCompleteSymbol(trimmedValue.replace(/^!/, ""));
    }
    else if (trimmedValue.startsWith('!') || excludeToggle) {
      setSelectedAutoCompleteSymbol(trimmedValue.replace(/^!/, ""));
      setExcludeToggle(true);
      excludeToggle ? onChange(`!${trimmedValue}`) : onChange(trimmedValue);
    } else {
      if (trimmedValue !== "") {
        setSelectedAutoCompleteSymbol(trimmedValue);
        setExcludeToggle(false);
        onChange(trimmedValue);
      } else {
        setSelectedAutoCompleteSymbol("");
        onChange(undefined);
      }
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

  const handleToggleChange = (checked: boolean) => {
    setExcludeToggle(checked);
    const newValue = checked ? `!${selectedAutoCompleteSymbol}` : selectedAutoCompleteSymbol.replace('!', '');
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
        value={selectedAutoCompleteSymbol ? selectedAutoCompleteSymbol.replace(/^!/, ""): ""}
        suggestions={filteredAutoCompleteSymbols}
        completeMethod={(e) => {
          const trimmedValue = e.query.trim();
          trimmedValue === ""
            ? []
            : (searchAutoCompleteSymbols(trimmedValue));
        }}
        onChange={(e) => {
          handleInputChange(e)
        }}
        className={cn("w-full", autoCompleteSymbolError ? "p-invalid" : "")}
        appendTo='self'
      />
      <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
        <div className={styles.label}>Exclude this criteria from matches.</div>
        <div style={{ marginLeft: 'auto' }}>
          <IOSSwitch
            disabled={!props.value}
            value={excludeToggle}
            onChange={handleToggleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AutocompleteField;
