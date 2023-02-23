import {WidgetProps} from "@rjsf/utils";
import React, {CSSProperties} from "react";
import {Panel} from "primereact/panel";
import {Ripple} from "primereact/ripple";
import {useSelector} from "react-redux";

const headerTemplate = (options: any, props: { title: string, }) => {
  const {title} = props;
  const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
  let className = `ctimsPanelHeaderMatching justify-content-start`;

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
        {/*<i className="pi pi-trash" style={trashIconStyle}></i>*/}
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
    marginTop: '16px',
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

  const addItemContainerStyle: React.CSSProperties = {
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

  const caretStyle: React.CSSProperties = {
    marginLeft: '6px',
    color: "#2E72D2",
  }

  return (
      <div style={containerStyle}>
        <Panel headerTemplate={(props) => headerTemplate(props, headerTemplateOptions)} toggleable>
          <div style={previewStyle}>
            <pre style={preStyle}>{JSON.stringify(formContext.match, null, 2)}</pre>
          </div>
        </Panel>
        <div style={addItemContainerStyle} onClick={btnClick}>
          <i className="pi pi-pencil" style={circleStyle}></i>
          <div style={titleStyle}>Edit matching criteria</div>
          <i className="bi bi-caret-down-fill" style={caretStyle}></i>
        </div>
      </div>
  )
}
export default CtimsMatchingCriteriaWidget;
