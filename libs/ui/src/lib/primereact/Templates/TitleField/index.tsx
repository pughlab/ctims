import React, {useEffect, useRef, useState} from "react";
import {TitleFieldProps} from "@rjsf/utils";

const TitleField = ({
                        id,
                        required,
                        registry,
                        title,
                        schema,
                        uiSchema
                    }: TitleFieldProps) => {

    const style: React.CSSProperties = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
    }

    return (
        <div style={style}>
            <span>{(uiSchema && uiSchema["ui:title"]) || title}</span>
        </div>
    );
}

export default TitleField;
