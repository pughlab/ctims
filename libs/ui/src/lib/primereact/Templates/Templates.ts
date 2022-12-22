import DescriptionField from "./DescriptionField";
import FieldTemplate from "./FieldTemplate";
import ErrorList from "./ErrorList";
import ArrayFieldItemTemplate from "./ArrayFieldItemTemplate";
import TitleField from "./TitleField";
import {TemplatesType} from "@rjsf/utils";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";

const Index: Partial<TemplatesType> = {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate: ArrayFieldTemplate as TemplatesType["ArrayFieldTemplate"],
    DescriptionFieldTemplate: DescriptionField,
    ErrorListTemplate: ErrorList,
    // FieldErrorTemplate,
    FieldTemplate,
    ObjectFieldTemplate:
        ObjectFieldTemplate as TemplatesType["ObjectFieldTemplate"],
    TitleFieldTemplate: TitleField as TemplatesType["TitleFieldTemplate"],
    // WrapIfAdditionalTemplate,
};

export default Index;
