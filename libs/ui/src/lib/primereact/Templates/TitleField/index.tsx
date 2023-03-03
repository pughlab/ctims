import React from "react";
import {TitleFieldProps} from "@rjsf/utils";

const TitleField = ({
                        id,
                        required,
                        registry,
                        title,
                        schema,
                        uiSchema
                    }: TitleFieldProps) => {
    // console.log(title)

    const style: React.CSSProperties = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
    }

    const stringToDash = (str: string) => {
        return str.split(' ').join('-').toLowerCase();
    }

    return (
        <div style={style} id={stringToDash(title)}>
            <span>{(uiSchema && uiSchema["ui:title"]) || title}</span>
        </div>
    );
}

export default TitleField;
