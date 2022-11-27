import React from "react";
import { WidgetProps, rangeSpec } from "@rjsf/utils";
import { Slider, SliderChangeParams } from "primereact/slider";

const RangeWidget = ({
  value,
  readonly,
  disabled,
  schema,
  onChange,
  required,
  label,
  id,
  uiSchema,
}: WidgetProps) => {
  const sliderProps = { value, label, id, ...rangeSpec(schema) };

  const _onChange = ({ value }: SliderChangeParams) =>
    onChange(value as number);
  const labelValue = uiSchema?.["ui:title"] || schema.title || label;

  return (
    <div>
      {labelValue && (
        <label htmlFor={id} className="block mb-1">
          {labelValue}
          {required ? "*" : null}
        </label>
      )}
      <Slider
        disabled={disabled || readonly}
        onChange={_onChange}
        {...sliderProps}
        range={false}
      />
    </div>
  );
};

export default RangeWidget;
