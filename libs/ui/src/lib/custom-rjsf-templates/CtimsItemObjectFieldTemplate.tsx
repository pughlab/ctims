import {getTemplate, getUiOptions, ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps} from "@rjsf/utils";
import React, {useEffect} from "react";
import {isObjectEmpty, stringContains} from "../components/helpers";

const CtimsItemObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
    const {
        description,
        disabled,
        formContext,
        formData,
        idSchema,
        onAddClick,
        properties,
        readonly,
        required,
        registry,
        schema,
        title,
        uiSchema,
    } = props;

    const uiOptions = getUiOptions(uiSchema);
    const TitleFieldTemplate = getTemplate<"TitleFieldTemplate">(
        "TitleFieldTemplate",
        registry,
        uiOptions
    );
    const DescriptionFieldTemplate = getTemplate<"DescriptionFieldTemplate">(
        "DescriptionFieldTemplate",
        registry,
        uiOptions
    );

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
    }

    const titleDescriptionStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',

    }
    const arrayContainer: React.CSSProperties = {
        // width: '640px',
        width: '100%',
        marginLeft: 'auto',
    }

    const hrStyle: React.CSSProperties = {
        marginBottom: '20px',
        marginTop: '20px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#e0e0e0',
    }

    // This magic line allows two-way communication between the main form and the dialog
  //   registry.formContext = formData
  // console.group('CtimsItemObjectFieldTemplate', props)
  // console.log('formContext registry', registry.formContext)
  // console.log('formData', formData)
  // console.groupEnd()
  const a = '';
    return (
        <>
            <div style={containerStyle}>
                <div style={titleDescriptionStyle}>
                    {/*{(schema.title) && (*/}
                    {/*    <TitleFieldTemplate*/}
                    {/*        id={`${idSchema.$id}-title`}*/}
                    {/*        title={schema.title}*/}
                    {/*        required={required}*/}
                    {/*        schema={schema}*/}
                    {/*        uiSchema={uiSchema}*/}
                    {/*        registry={registry}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {(schema.description) && (
                        <DescriptionFieldTemplate
                            id={`${idSchema.$id}-description`}
                            description={uiOptions.description || description!}
                            schema={schema}
                            uiSchema={uiSchema}
                            registry={registry}
                        />
                    )}
                </div>

                <div id={`object-field-template-${idSchema.$id}`} style={arrayContainer}>
                    {properties
                        .filter((e) => !e.hidden)
                        .map((element: ObjectFieldTemplatePropertyType, index: number) => (
                            <div
                                key={index}
                                className={element.hidden ? "d-none" : undefined}
                            >
                                {element.content}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
export default CtimsItemObjectFieldTemplate;
