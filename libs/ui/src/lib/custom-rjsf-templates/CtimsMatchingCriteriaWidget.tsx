import {WidgetProps} from "@rjsf/utils";
import React, {CSSProperties} from "react";
import {Panel} from "primereact/panel";
import {Ripple} from "primereact/ripple";
import {useSelector} from "react-redux";

const headerTemplate = (options: any, props: { title: string, }) => {
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
        <i className="pi pi-trash" style={trashIconStyle}></i>
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

  // Will trigger re-render when the ctmlModel changes and thus will display the preview
  // The dispatch is called from ui.tsx in onDialogHideCallback
  const ctmlModel: any = useSelector((state: any) => state.ctmlModel.ctmlModel);

  const btnClick = uiSchema!['onClick'];

  const containerStyle: CSSProperties = {
    width: '100%',
    marginLeft: 'auto',
  }

  const previewStyle: CSSProperties = {
    height: '300px',
    border: '1px solid #d9d9d9',
  }

  const headerTemplateOptions = {
    title: 'Matching Criteria',
  }

  const preStyle: CSSProperties = {
    height: '100%',
    overflowY: 'scroll',
  }

  return (
      <div style={containerStyle}>
        <Panel headerTemplate={(props) => headerTemplate(props, headerTemplateOptions)} toggleable>
          <div style={previewStyle}>
            <pre style={preStyle}>{JSON.stringify(formContext.match, null, 2)}</pre>
          </div>
        </Panel>
      </div>
  )
}
export default CtimsMatchingCriteriaWidget;
