import {WidgetProps} from "@rjsf/utils";

const CtimsButtonWidget = (props: WidgetProps) => {
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

  const buttonClick = (e: any) => {
    e.preventDefault();
    console.log('Match dialog Arm Code: ', formContext.arm_code);
    console.log('buttonClick', props);
  }

  return (
    <button
      id={id}
      disabled={disabled || readonly}
      onClick={(e) => btnClick(e, formContext, formContext.arm_code, id)}
      // onClick={(e) => buttonClick(e)}
    >
      {label || 'Submit'}
    </button>
  );
}
export default CtimsButtonWidget;
