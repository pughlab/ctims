import {ArrayFieldTemplateItemType} from "@rjsf/utils";
import {Panel} from "primereact/panel";
import React from "react";
import {Ripple} from "primereact/ripple";

const headerTemplate = (options: any, props: {
    title: string,
    onDropIndexClick: any,
    index: number,
    hasRemove: boolean,
}) => {
    const {title, onDropIndexClick, index, hasRemove} = props;
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    // const className = `${options.className} justify-content-start`;
    let className = `ctimsPanelHeaderTop justify-content-start`;
    if (index > 0) {
        className = `ctimsPanelHeaderOther justify-content-start`;
    }
    const titleClassName = `${options.titleClassName} pl-1`;

    const titleStyle: React.CSSProperties = {
        textTransform: 'uppercase',
    }

    const trashIconStyle: React.CSSProperties = {
        color: 'red',
        cursor: 'pointer',
        marginRight: '13px',
    }

    return (
        <div className={className}>
            <span className={titleClassName} style={titleStyle}>
                {title}
            </span>
            <div>
                {hasRemove && (<i className="pi pi-trash" style={trashIconStyle} onClick={onDropIndexClick(index)}></i>)}
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
            </div>
        </div>
    )
}

const CtimsArrayFieldItemTemplate = (props: ArrayFieldTemplateItemType) => {
    const {
        children,
        disabled,
        hasMoveDown,
        hasMoveUp,
        hasRemove,
        hasToolbar,
        index,
        onDropIndexClick,
        onReorderClick,
        readonly,
        registry,
        uiSchema,
    } = props;

    const title = children.props.name

    const headerTemplateOptions = {
        title,
        onDropIndexClick,
        index,
        hasRemove
    }

    const style: React.CSSProperties = {
        // paddingLeft: '300px',
    }

    return (
        <div key={`array-item-${index}`} className="flex align-items-start gap-2 p-2 border-1 border-round" style={style}>
            <Panel headerTemplate={(props) => headerTemplate(props, headerTemplateOptions)} toggleable>
                <div className="flex-grow-1">{children}</div>
            </Panel>
        </div>
    )
}
export default CtimsArrayFieldItemTemplate
