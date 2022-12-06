import {WidgetProps} from "@rjsf/utils";

const CtimsButtonWidget = (props: WidgetProps) => {
  const {
    id,
    label,
    disabled,
    readonly,
    onChange,
  } = props;

  const buttonClick = (e: any) => {
    e.preventDefault();
    console.log('buttonClick', e);
  }

  return (
    <button
      id={id}
      disabled={disabled || readonly}
      // onClick={() => onChange('clicked')}
      onClick={(e) => buttonClick(e)}
    >
      {label || 'Submit'}
    </button>
  );
}
export default CtimsButtonWidget;
