import {CSSProperties} from "react";

export const EmptyHelper = (props: any) => {

  const containerStyle: CSSProperties = {
    'height': '100%',
    'padding': '0',
    'margin': '0',
    'display': 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const textStyle: CSSProperties = {
    'fontFamily': "'Inter', sans-serif",
    'fontStyle': 'normal',
    'fontWeight': '400',
    'fontSize': '14px',
    'lineHeight': '16px',
    'color': 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    width: '314px'
  }

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        Add clinical or genomic criteria by clicking on the 3 dots in the navigator on the left.
      </div>
    </div>
  )
}
