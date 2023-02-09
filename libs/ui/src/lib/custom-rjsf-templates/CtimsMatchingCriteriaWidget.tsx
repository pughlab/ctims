import {WidgetProps} from "@rjsf/utils";
import React, {CSSProperties} from "react";
import {Panel} from "primereact/panel";
import {Ripple} from "primereact/ripple";

const headerTemplate = (options: any, props: {
  title: string,
}) => {
  const {title} = props;
  const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
  // const className = `${options.className} justify-content-start`;
  let className = `ctimsPanelHeaderTop justify-content-start`;
  // if (index > 0) {
  //   className = `ctimsPanelHeaderOther justify-content-start`;
  // }
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
        <i className="pi pi-trash" style={trashIconStyle}></i>)
        <button className={options.togglerClassName} onClick={options.onTogglerClick}>
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
      </div>
    </div>
  )
}

const CtimsMatchingCriteriaWidget = (props: WidgetProps) => {
  const {
    id,
    label,
    disabled,
    formContext,
    readonly,
    onChange,
    uiSchema,
  } = props;

  const btnClick = uiSchema!['onClick'];

  const containerStyle: CSSProperties = {
    width: '100%',
    marginLeft: 'auto',
  }

  const headerTemplateOptions = {
    title: 'Matching Criteria',
  }

  return (
      <div style={containerStyle}>
        <Panel headerTemplate={(props) => headerTemplate(props, headerTemplateOptions)} toggleable>
          <div className="flex-grow-1">

          </div>
        </Panel>
      </div>
  )
}
