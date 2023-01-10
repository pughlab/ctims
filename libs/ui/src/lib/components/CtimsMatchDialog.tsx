import styles from './CtimsMatchDialog.module.scss';
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {JSONSchema7} from "json-schema";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {Dropdown} from "primereact/dropdown";
import TreeNode from "primereact/treenode";
import {Tree, TreeEventNodeParams} from "primereact/tree";
import * as jsonpath from "jsonpath";


interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  dialogSchema: JSONSchema7;
  uiSchema: any;
  onRjsfFormChange: (data: any) => void;
  onDialogHide: () => void;
}



const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<any>(null);
  const [expandedKeys, setExpandedKeys] = useState({0: true});
  const [rootNodes, setRootNodes] = useState<TreeNode[]>([]);
  const [componentToRender, setComponentToRender] = useState<any>(null);

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

  const buildRootNodes = (rootLabel: string, firstChildLabel: string): TreeNode[] => {
    const r = [
      {
        key: '0',
        label: rootLabel,
        data: {},
        children: [
          {
            key: '0-0',
            label: firstChildLabel,
            data: {},
          }
        ]
      }
    ];
    const rootData = r[0].data;
    // @ts-ignore
    rootData[rootLabel.toLowerCase()] = [];
    let component = firstChildLabel.toLowerCase() === 'clinical' ? ClinicalForm : GenomicForm;
    // @ts-ignore
    r[0].children[0].data = {component, type: firstChildLabel.toLowerCase()};
    return r;
  }

  const menuItems = [
    {
      label: 'Clinical',
      command: () => {
        const rootNodes = buildRootNodes('And', 'Clinical');
        setRootNodes(rootNodes);
        setSelectedKeys('0-0')
        console.log('selectedKeys', selectedKeys);
      }
    },
    {
      label: 'Genomic',
      command: () => {
        const rootNodes = buildRootNodes('And', 'Genomic');
        setRootNodes(rootNodes);
        setSelectedKeys('0-0')
        console.log('selectedKeys', selectedKeys);
      }
    }
  ];

  // const rootNodes: TreeNode[] = [
  //     {
  //       key: '0',
  //       label: "And",
  //       data: {
  //         and: []
  //       },
  //       children: [
  //         {
  //           key: '0-0',
  //           label: 'Clinical',
  //           data: {
  //             clinical: {}
  //           },
  //         }
  //       ]
  //     }
  // ];

  const menu = useRef(null);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])
  useEffect(() => {
    // use jsonpath to find key '0-0' in rootNodes
    const r = jsonpath.query(rootNodes, '$..[?(@.key=="0-0")]');
    if(r.length > 0) {
      setIsEmpty(false);
      console.log('r', r);
      setComponentToRender(r[0].data.component);
    }
  }, [rootNodes])

  const menuClick = (e: any) => {
    // @ts-ignore
    menu.current.show(e);
  }

  const AddCriteriaButton = () => {
    return (
      <div className={styles.addCriteriaBtn} onClick={(e) => {menuClick(e)}}>
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



  const onNodeToggle = (e: any) => {
    console.log('selectedKeys', selectedKeys);
    setExpandedKeys(e.value)
    console.log('expandedKeys', expandedKeys);
  }

  const onNodeSelect = (node: TreeEventNodeParams) => {
    console.log('selectedKeys', selectedKeys);
    console.log('expandedKeys', expandedKeys);
    console.log(node.node.data);
  }

  const MatchingMenuAndForm = () => {
    return (
      <>
        <Menu model={menuItems} ref={menu} popup id="criteria_popup_menu"/>
        <div className={styles.matchingMenuAndFormContainer}>
          <div className={styles.matchingCriteriaMenuContainer}>
            <div className={styles.matchingCriteriaTextContainer}>
              <div className={styles.matchingCriteriaText}>Matching Criteria</div>
              <i className="pi pi-plus-circle" onClick={(e) => {
                menuClick(e);
              }}></i>

            </div>
            <Tree value={rootNodes}
                  expandedKeys={expandedKeys}
                  selectionKeys={selectedKeys}
                  selectionMode="single"
                  onSelect={onNodeSelect}
                  onToggle={e => onNodeToggle(e) } />
          </div>
          <div className={styles.matchingCriteriaFormContainer}>
            {isEmpty ? <EmptyForm /> : componentToRender}
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
