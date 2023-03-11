import cn from "clsx";
import React from "react";
import { FieldTemplateProps } from "@rjsf/utils";

const CtimsFieldTemplate = (props: FieldTemplateProps) => {
  const {
    id,
    hidden,
    children,
    displayLabel,
    rawErrors = [],
    rawHelp,
    errors,
    rawDescription
  } = props;
  if (hidden) {
    return <>{children}</>;
  }

  return (
    <div>
      {children}
        {/*<ul className="error-detail">*/}
        {/*  {rawErrors.map((error: string) => (*/}
        {/*    <li key={error} className="text-sm text-color-danger m-0 p-0">*/}
        {/*      {error}*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      {rawHelp && (
        <div
          id={id}
          className={cn("text-sm", rawErrors.length > 0 ? "text-color-danger" : "text-color-muted")}
        >
          {rawHelp}
        </div>
      )}
    </div>
  );
};
export default CtimsFieldTemplate;
