
import React, { useState } from 'react';
import { Chips } from 'primereact/chips';

export const ChipsDemo = () => {
  const [values1, setValues1] = useState<any>([]);
  const [values2, setValues2] = useState<any>([]);
  const [values3, setValues3] = useState<any>([]);

  const customChip = (item: any) => {
    return (
      <div>
        <span>{item} - (active) </span>
        <i className="pi pi-user-plus" style={{ fontSize: '14px' }}></i>
      </div>
    );
  }

  return (
    <div>
      <div className="card p-fluid">
        <h5>Basic</h5>
        <Chips value={values1} onChange={(e) => setValues1(e.value)} />

        <h5>Comma Separator</h5>
        <Chips value={values2} onChange={(e) => setValues2(e.value)} separator="," />

        <h5>Template</h5>
        <Chips value={values3} onChange={(e) => setValues3(e.value)} max={5} itemTemplate={customChip}></Chips>
      </div>
    </div>
  )
}
