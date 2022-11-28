import './ui.module.scss';
import { Theme as PrimeTheme} from '../lib/primereact'
import localValidator from "@rjsf/validator-ajv8";
import {withTheme} from "@rjsf/core";
import {schema, uiSchema} from "./custom-rjsf-templates/generatedSchema";
import {RegistryWidgetsType} from "@rjsf/utils";
import CtimsArrayFieldItemTemplate from "./custom-rjsf-templates/CtimsArrayFieldItemTemplate";
import CtimsArrayFieldTemplate from "./custom-rjsf-templates/CtimsArrayFieldTemplate";
import {JSONSchema7} from "json-schema";
import CtimsInput from "./custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "./custom-rjsf-templates/CtimsDropdown";

const Form = withTheme(PrimeTheme)

/* eslint-disable-next-line */
export interface UiProps {}

export function Ui(props: UiProps) {

  const widgets: RegistryWidgetsType = {
    TextWidget: CtimsInput,
    SelectWidget: CtimsDropdown
  }

  return (
    <Form schema={schema as JSONSchema7}
          templates={{
            ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,
            ArrayFieldTemplate: CtimsArrayFieldTemplate,
          }}
          uiSchema={uiSchema}
          widgets={widgets}
          onSubmit={(data) => {console.log(data.formData)}} validator={localValidator}/>
  );
}

export default Ui;
