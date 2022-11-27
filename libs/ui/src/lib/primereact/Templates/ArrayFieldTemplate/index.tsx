import {
    ArrayFieldDescriptionProps, ArrayFieldTemplateItemType,
    ArrayFieldTemplateProps,
    ArrayFieldTitleProps,
    getTemplate,
    getUiOptions
} from "@rjsf/utils";
import IconButton from "../../IconButton";
import React from "react";

const ArrayFieldTemplate = ({
    canAdd,
    className,
    disabled,
    formContext,
    idSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
}: ArrayFieldTemplateProps) => {
    const uiOptions = getUiOptions(uiSchema);
    const ArrayFieldDescriptionTemplate = getTemplate(
        "ArrayFieldDescriptionTemplate",
        registry,
        uiOptions
    );
    const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate">(
        "ArrayFieldItemTemplate",
        registry,
        uiOptions
    );
    const ArrayFieldTitleTemplate = getTemplate<"ArrayFieldTitleTemplate">(
        "ArrayFieldTitleTemplate",
        registry,
        uiOptions
    );

    return (
        <>
            <ArrayFieldTitleTemplate
                key={`array-field-title-${idSchema.$id}`}
                idSchema={idSchema}
                required={required}
                title={uiOptions.title || title}
                schema={schema}
                uiSchema={uiSchema}
                registry={registry}
            />
            {(uiSchema?.["ui:description"] || schema.description) && (
                <ArrayFieldDescriptionTemplate
                    key={`array-field-description-${idSchema.$id}`}
                    description={uiOptions.description || schema.description || ""}
                    idSchema={idSchema}
                    schema={schema}
                    uiSchema={uiSchema}
                    registry={registry}
                />
            )}

            <div key={`array-item-list-${idSchema.$id}`} className="flex flex-column gap-2">
                {items && items.map((item: ArrayFieldTemplateItemType) => {
                    const { key, ...itemProps } = item;
                    return (
                        <ArrayFieldItemTemplate key={key} {...itemProps} />
                    )})}

                {canAdd && (
                    <IconButton
                        icon="plus"
                        className="mt-1 mb-3 array-item-add"
                        onClick={onAddClick}
                        disabled={disabled || readonly}
                    />
                )}
            </div>
        </>
    );
}
export default ArrayFieldTemplate;
