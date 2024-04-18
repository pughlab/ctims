import React, {useEffect} from "react";
import {WidgetProps} from "@rjsf/utils";
import { v4 as uuidv4 } from 'uuid';
import {ArmCodeUUIDSingleton} from "../../../../../apps/web/service/ArmCodeUUIDSingleton";

const CtimsUUIDComponent = (props: WidgetProps) => {

  let {
    id,
    name,
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
    rawErrors = [],
  } = props;


  useEffect(() => {
    const amrCodeUUIDInstance = ArmCodeUUIDSingleton.getInstance();

    if (!amrCodeUUIDInstance.getUUID(id)) {
      const uuid = uuidv4();
      amrCodeUUIDInstance.setUUID(id, uuid);
      setTimeout(() => {
        onChange(uuid);
      });
    }

    return () => {
      amrCodeUUIDInstance.removeUUID(id);
    };
  }, []);

  return (
    <div style={{display: "none"}}> UUID
      {props.value}
    </div>
  )
};

export default CtimsUUIDComponent;
