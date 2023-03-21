import { Col, Row } from 'antd'
import React from 'react'
import { Card } from 'primereact/card';

import {getTemplate, getUiOptions, ObjectFieldTemplateProps, Registry} from "@rjsf/utils";
/* eslint-disable react/no-array-index-key */

export const RjsfGridFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const {
    title,
    description,
    uiSchema,
    idSchema,
    required,
    disabled,
    readonly,
    formData,
    // formContext,
    registry,
    properties,
    schema
  } = props

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

  // const filterHidden = (element: any) =>
  //   element.content.props.uiSchema['ui:widget'] !== 'hidden'

  const findContent = (name: string) => {
    return properties.find((prop: any) => {
      return prop.name === name
    })
  }

  const layout = uiSchema?.['ui:layout']
  const gutter = uiSchema?.['ui:spacing']

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  }

  const titleDescriptionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  const rowStyle = {
    marginBottom: '15px'
  }

  const objectContainerStyle: React.CSSProperties = {
    width: '640px',
    marginLeft: 'auto',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '6px',
    background: 'white',
    padding: '20px'
  }

  const hrStyle: React.CSSProperties = {
    marginBottom: '20px',
    marginTop: '20px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#e0e0e0',
  }

  const stringToDash = (str: string) => {
    return str.split(' ').join('-').toLowerCase();
  }

  return (
    <>
      {(title === 'Age') && (<hr style={hrStyle}/>)}
      <div style={containerStyle} id={stringToDash(title)}>
        <div style={titleDescriptionStyle}>
          {(schema.title) && (
              <TitleFieldTemplate
                  id={`${idSchema.$id}-title`}
                  title={schema.title}
                  required={required}
                  schema={schema}
                  uiSchema={uiSchema}
                  registry={registry}
              />
          )}
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
        <div style={objectContainerStyle}>
          {layout?.map((row: any, index: number) => {
            const rowKeys = Object.keys(row)

            if (row['ui:order'] && row['ui:order'].length > 0) {
              const orderedKeys = row['ui:order']

              return (
                  <div style={rowStyle} key={index}>
                    <Row gutter={gutter}>
                      {orderedKeys.map((name: string) => {
                        // @ts-ignore
                        if (schema.properties[name]) {
                          const content = findContent(name)

                          return <Col span={row[name].span}>{content?.content}</Col>
                        }

                        return null
                      })}
                    </Row>
                  </div>
              )
            }

            return (
                <div style={rowStyle} key={index}>
                  <Row gutter={gutter}>
                    {rowKeys.map((name: string, index: number) => {
                      // @ts-ignore
                      if (schema.properties[name]) {
                        const element = findContent(name)

                        return <Col key={index} span={row[name].span}>{element?.content}</Col>
                      }

                      return null
                    })}
                  </Row>
                </div>

            )
          })}
        </div>
      </div>
    </>
  )
}
