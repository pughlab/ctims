import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Tooltip } from 'primereact/tooltip';
import styles from './CtimsAutoCompleteComponent.module.css';
import useGetGenes from '../../../../../apps/web/hooks/useGetGenes';
import IOSSwitch from '../components/IOSSwitch';

interface AutocompleteFieldProps {
    value?: string;
    onChange: (value: string | undefined) => void;
    schema: {
        title?: string;
        description?: string;
        ["ui:title"]?: string;
    };
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ onChange, schema, ...props }) => {
    const { filteredHugoSymbols, searchSymbols } = useGetGenes();
    const [selectedHugoSymbol, setSelectedHugoSymbol] = useState<string>(props.value || '');
    const [excludeToggle, setExcludeToggle] = useState<boolean>(
        props.value?.startsWith('!') || false
    );

    useEffect(() => {
        const isExcluded = props.value?.startsWith('!');
        setSelectedHugoSymbol(props.value ? props.value.replace('!', '') : '');
        setExcludeToggle(isExcluded || false);
    }, [props.value]);

    const handleInputChange = (e: { value: string }) => {
        const trimmedValue = e.value.trim();
        if (trimmedValue !== '') {
            const newValue = excludeToggle ? `!${trimmedValue}` : trimmedValue;
            setSelectedHugoSymbol(trimmedValue);
            onChange(newValue);
        } else {
            setSelectedHugoSymbol('');
            onChange(undefined);
        }
    };

    const handleToggleChange = (checked: boolean) => {
        setExcludeToggle(checked);
        const newValue = checked ? `!${selectedHugoSymbol}` : selectedHugoSymbol.replace('!', '');
        onChange(newValue);
    };

    const arrayContainer = {
        flexGrow: 1,
        minWidth: 0,
        marginLeft: 'auto',
    };

    const labelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        height: '36px',
        fontFamily: "'Inter', sans-serif",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#495057',
    };

    const questionMarkStyle = `${styles['question-mark']} pi pi-question-circle`;
    const labelValue = schema?.["ui:title"] || schema.title || 'Hugo Symbol';

    return (
        <div className={styles.container}>
            {labelValue && (
                <label style={labelStyle}>
                    {labelValue}
                    {schema.description && (
                        <Tooltip target=".tooltip-icon" position="top" />
                    )}
                    <i
                        className={`tooltip-icon ${questionMarkStyle}`}
                        data-pr-tooltip={schema.description}
                    ></i>
                </label>
            )}

            <AutoComplete
                inputStyle={arrayContainer}
                value={selectedHugoSymbol}
                suggestions={filteredHugoSymbols}
                completeMethod={(e) => {
                    const trimmedValue = e.query.trim();
                    if (trimmedValue !== '') {
                        const newValue = excludeToggle ? `!${trimmedValue}` : trimmedValue;
                        setSelectedHugoSymbol(trimmedValue);
                        onChange(newValue);
                        searchSymbols(trimmedValue);
                    }
                }}
                onChange={(e) => handleInputChange(e)}
                appendTo="self"
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
