import React, {useEffect, useRef, useState} from "react";
import {TitleFieldProps} from "@rjsf/utils";

const TitleField = ({
                        id,
                        required,
                        registry,
                        title,
                        schema,
                        uiSchema
                    }: TitleFieldProps) => {
  //   console.log(uiSchema)
  //
  // const [isElementOnTop, setIsElementOnTop] = useState(false);
  // const elementRef = useRef<any>(null);
  //
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const element = elementRef.current;
  //
  //     if (element) {
  //       const elementRect = element.getBoundingClientRect();
  //       const isElementOnTop = elementRect.top <= 0;
  //       setIsElementOnTop(isElementOnTop);
  //       console.log('isElementOnTop', isElementOnTop)
  //     }
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


    const style: React.CSSProperties = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
    }

    const stringToDash = (str: string) => {
        return str.split(' ').join('-').toLowerCase();
    }

    return (
        <div style={style} id={stringToDash(title)}>
            <span>{(uiSchema && uiSchema["ui:title"]) || title}</span>
        </div>
    );
}

export default TitleField;
