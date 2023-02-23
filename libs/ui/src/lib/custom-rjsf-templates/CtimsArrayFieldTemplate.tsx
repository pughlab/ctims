import {ArrayFieldTemplateItemType, ArrayFieldTemplateProps, getTemplate, getUiOptions} from "@rjsf/utils";
import React, {CSSProperties} from 'react'
import {stringContains} from "../components/helpers";

const CtimsArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
    const {
        canAdd,
        className,
        disabled,
        formContext,
        idSchema,
        items,
        onAddClick,
        readonly,
        registry,
        required,
        schema,
        title,
        uiSchema,
    } = props;

    const uiOptions = getUiOptions(uiSchema);
    const ArrayFieldDescriptionTemplate = getTemplate(
        "ArrayFieldDescriptionTemplate",
        registry,
        uiOptions
    );
    const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate">(
        "ArrayFieldItemTemplate",
        registry,
        uiOptions
    );
    const ArrayFieldTitleTemplate = getTemplate<"ArrayFieldTitleTemplate">(
        "ArrayFieldTitleTemplate",
        registry,
        uiOptions
    );

    const addItemContainerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        height: '56px',
        lineHeight: '56px',
        backgroundColor: 'white',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    }

    const addItemContainerStyleGray: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
      height: '56px',
      lineHeight: '56px',
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      borderLeft: '1px solid #E4E4E4',
      borderRight: '1px solid #E4E4E4',
      borderBottom: '1px solid #E4E4E4',
      borderTop: '1px solid #E4E4E4',
    }

    const titleStyle: React.CSSProperties = {
        color: "#2E72D2",
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: "14px",
        marginLeft: '4px',
    }

    const circleStyle: React.CSSProperties = {
        lineHeight: '56px',
        color: "#2E72D2",
        marginLeft: '20px',
    }

    const getArrayItemName = (item: ArrayFieldTemplateItemType, index: number) => {
        const {children} = item
        // console.log('children', children);
        const newProps = {...children.props}
        const originalName: string = children.props.name
        const schema = children.props.schema
        // remove numbers and dashes from original name
        let newName = originalName.replace(/[\d-]/g, '')
        if(schema.title) {
          newName = schema.title
        }
        const indexPlusOne = index + 1
        newProps.name = `${newName} ${indexPlusOne}`
        const newChildren = React.cloneElement(children, newProps)
        return newChildren
    };

    const arrayStyle: CSSProperties = {
    }

    if (stringContains(title.toLowerCase(), 'dose')) {
      arrayStyle.marginTop = '24px';
    }

    const caretStyle: React.CSSProperties = {
        marginLeft: '6px',
        color: "#2E72D2",
    }

    const addStyle = () => {
      let result;
      if (stringContains(title.toLowerCase(), 'dose') || stringContains(title.toLowerCase(), 'arm')) {
        result = addItemContainerStyleGray;
      } else {
        result = addItemContainerStyle;
      }
      return result;
    }

    return (
        <>
            {/*{(uiSchema?.["ui:description"] || schema.description) && (*/}
            {/*    <ArrayFieldDescriptionTemplate*/}
            {/*        key={`array-field-description-${idSchema.$id}`}*/}
            {/*        description={uiOptions.description || schema.description || ""}*/}
            {/*        idSchema={idSchema}*/}
            {/*        schema={schema}*/}
            {/*        uiSchema={uiSchema}*/}
            {/*        registry={registry}*/}
            {/*    />*/}
            {/*)}*/}

            <div key={`array-item-list-${idSchema.$id}`} id={`array-item-list-${idSchema.$id}`} style={arrayStyle}>
                {items && items.map((item: ArrayFieldTemplateItemType, index) => {
                    // deep clone item without stringifying and parsing
                    const { key, ...itemProps } = item;
                    const newChildren = getArrayItemName(item, index)
                    // console.log('debug', item)
                    return (
                        <ArrayFieldItemTemplate key={key} {...itemProps} children={newChildren} />
                    )})}

                {canAdd && (
                    <div style={addStyle()} onClick={onAddClick}>
                        <i className="pi pi-plus-circle" style={circleStyle}></i>
                        <div style={titleStyle}>Add {title}</div>
                        <i className="bi bi-caret-down-fill" style={caretStyle}></i>
                    </div>
                )}
            </div>
        </>
    );
}

export default CtimsArrayFieldTemplate
