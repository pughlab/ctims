import styles from './CtimsMatchDialog.module.scss';
import React, {createRef, CSSProperties, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {JSONSchema7} from "json-schema";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {Dropdown} from "primereact/dropdown";

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  dialogSchema: JSONSchema7;
  uiSchema: any;
  onRjsfFormChange: (data: any) => void;
  onDialogHide: () => void;
}

const menuItems = [
  {
    label: 'Clinical',
  },
  {
    label: 'Genomic',
  }
]

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);
  const [isEmpty, setIsEmpty] = useState(true);

  const menu = useRef(null);
  const iRef = useRef(null);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  const menuClick = (e: any) => {
    console.log('menuClick', iRef.current);
    // @ts-ignore
    menu.current.toggle(e);
  }

  const AddCriteriaButton = () => {
    return (
      <div className={styles.addCriteriaBtn} onClick={() => {setIsEmpty(false)}}>
        <i className="pi pi-plus-circle"></i>
        <span>Add criteria</span>
      </div>
    )
  }

  const EmptyForm = () => {
    return (
      <div className={styles.matchingCriteriaFormContainerEmpty}>
        <div className={styles.matchingCriteriaFormContainerEmptyText}>
          Matching criteria inputs will be shown here.
        </div>
        <AddCriteriaButton />
      </div>
    )
  }

  const OperatorDropdown = () => {
    const [operator, setOperator] = useState({ name: 'AND (if all criteria are met)', code: 'AND' });

    // TODO: make it a template to reflect different font for AND and description
    const dropDownItems = [
      { name: 'AND (if all criteria are met)', code: 'AND' },
      { name: 'OR (if any criteria are met)', code: 'OR' },
    ];

    const onOperatorChange = (e: any) => {
      console.log('onOperatorChange', e.value);
      setOperator(e.value);
    }

    const dropDownStyle: CSSProperties = {
      width: '600px',
      marginLeft: '20px',
      marginRight: '20px',
    }

    const labelStyle: CSSProperties = {
      marginBottom: '7px',
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '20px',
    }

    return (
      <>
        <div style={labelStyle}>Operator</div>
        <Dropdown value={operator}
                  style={dropDownStyle}
                  options={dropDownItems}
                  onChange={onOperatorChange}
                  optionLabel="name" />
      </>
    )
  }

  const TitleContainer = (props: {title: string}) => {
    const {title} = props;

    const deleteButtonClasses = `p-button-text p-button-plain p-button-danger ${styles.deleteButton}`;
    const addCriteriaButtonClasses = `p-button-text p-button-plain ${styles.addCriteriaToSameListButton}`;

    return (
      <div className={styles.titleContainer}>
        <div className={styles.titleContainerText}>
          {title}
        </div>
        <Button icon="pi pi-trash" label="Delete" iconPos="left" className={deleteButtonClasses} />
        <Button icon="pi pi-plus-circle" label="Add criteria to the same list" iconPos="left" className={addCriteriaButtonClasses} />
      </div>
    )
  }

  const ClinicalForm = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <OperatorDropdown />
          <div>
            <TitleContainer title="Clinical" />
          </div>
        </div>
    )
  }

  const GenomicForm = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Genomic" />
        </div>
      </div>
    )
  }

  const MatchingMenuAndForm = () => {
    return (
      <>
        <Menu model={menuItems} ref={menu} popup id="criteria_popup_menu" appendTo={iRef.current}/>
        <div className={styles.matchingMenuAndFormContainer}>
          <div className={styles.matchingCriteriaMenuContainer}>
            <div className={styles.matchingCriteriaTextContainer}>
              <div className={styles.matchingCriteriaText}>Matching Criteria</div>
              <i ref={iRef} className="pi pi-plus-circle" onClick={(e) => {
                menuClick(e);
              }}></i>

            </div>
          </div>
          <div className={styles.matchingCriteriaFormContainer}>
            {isEmpty ? <EmptyForm /> : <ClinicalForm />}
          </div>
        </div>
      </>
    )
  }

  const MatchingCriteriaPreview = () => {
    return (
      <div className={styles.matchingCriteriaPreview}>
        Matching criteria preview will be shown here.
      </div>
    )
  }

  const handleSubmit = () => {
    console.log('clicked submit');
  }

  const dismissBtnStyle: CSSProperties = {
    height: '36px',
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#2E72D2'
  }

  const saveBtnStyle: CSSProperties = {
    marginLeft: '8px',
    backgroundColor: '#2E72D2',
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16px',
    height: '36px'
  }

  const footer = (
    <div style={{marginTop: '10px'}}>
      <Button style={dismissBtnStyle} label="Discard" className="p-button-text" onClick={handleSubmit} />
      <Button style={saveBtnStyle} label="Save matching criteria" onClick={handleSubmit} />
    </div>
  );



  const onDialogHide = () => {
    props.onDialogHide();
  }

  return (
    <Dialog header="<arm_code> matching criteria" footer={footer} visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm/>
        <MatchingCriteriaPreview/>
      </div>
      {/*<Form schema={props.dialogSchema as JSONSchema7}*/}
      {/*      templates={{*/}
      {/*        ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,*/}
      {/*        ArrayFieldTemplate: CtimsArrayFieldTemplate,*/}
      {/*      }}*/}
      {/*      onChange={(data) => {props.onRjsfFormChange(data)}}*/}
      {/*      uiSchema={props.uiSchema}*/}
      {/*      widgets={widgets}*/}
      {/*      onSubmit={(data) => {handleSubmit(data.formData)}} validator={localValidator}/>*/}
    </Dialog>
  )
}
export default CtimsMatchDialog;
