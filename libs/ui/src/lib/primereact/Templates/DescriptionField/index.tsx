import React from "react";
import { FieldProps } from "@rjsf/utils";

const DescriptionField = ({ description, id }: Partial<FieldProps>) => {
    if (!description) {
        return null;
    }

    const style: React.CSSProperties = {
        width: '364px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.87)',
    }

    return <div id={id} style={style}>{description}</div>;
};

export default DescriptionField;
