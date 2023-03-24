import {ArrayFieldTemplateItemType, ArrayFieldTemplateProps, getTemplate, getUiOptions} from "@rjsf/utils";
import React from 'react'

const CtimsArrayFieldSingleTemplate = (props: ArrayFieldTemplateProps) => {
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

  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate">(
    "TitleFieldTemplate",
    registry,
    uiOptions
  );
  const DescriptionFieldTemplate = getTemplate<"DescriptionFieldTemplate">(
    "DescriptionFieldTemplate",
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
    console.log('children', children);
    const newProps = {...children.props}
    const originalName: string = children.props.name
    const schema = children.props.schema
    let newName = originalName.replace(/[\d-]/g, '')
    if(schema.title) {
      newName = schema.title
    }
    // remove numbers and dashes from original name

    const indexPlusOne = index + 1
    newProps.name = `${newName} ${indexPlusOne}`
    const newChildren = React.cloneElement(children, newProps)
    return newChildren
  };

  const caretStyle: React.CSSProperties = {
    marginLeft: '6px',
    color: "#2E72D2",
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  }

  const arrayContainer: React.CSSProperties = {
    width: '640px',
    marginLeft: 'auto',
  }

  const titleDescriptionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  const hrStyle: React.CSSProperties = {
    marginBottom: '20px',
    marginTop: '20px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#e0e0e0',
  }

  const stringToDash = (str: string) => {
    return str.split(' ').join('-').toLowerCase();
  }

  return (
    <>
      <hr style={hrStyle}/>
      <div style={containerStyle} id={stringToDash(title)}>
        <div style={titleDescriptionStyle}>
          {(schema.title) && (
            <TitleFieldTemplate
              id={`${idSchema.$id}-title`}
              title={schema.title}
              required={required}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          )}
          {(schema.description) && (
            <DescriptionFieldTemplate
              id={`${idSchema.$id}-description`}
              description={schema.description!}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          )}
        </div>
        <div key={`array-item-list-${idSchema.$id}`} id={`array-item-list-${idSchema.$id}`} style={arrayContainer}>
          {items && items.map((item: ArrayFieldTemplateItemType, index) => {
            // deep clone item without stringifying and parsing
            const { key, ...itemProps } = item;
            const newChildren = getArrayItemName(item, index)
            // console.log('debug', item)
            return (
              <ArrayFieldItemTemplate key={key} {...itemProps} children={newChildren} />
            )})}

          {canAdd && (
            <div style={addItemContainerStyle} onClick={onAddClick}>
              <i className="pi pi-plus-circle" style={circleStyle}></i>
              <div style={titleStyle}>Add {title}</div>
              <i className="bi bi-caret-down-fill" style={caretStyle}></i>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default CtimsArrayFieldSingleTemplate
