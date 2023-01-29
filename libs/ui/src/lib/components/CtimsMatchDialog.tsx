import styles from './CtimsMatchDialog.module.scss';
import React, {CSSProperties, FunctionComponent, memo, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {JSONSchema7} from "json-schema";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import { TieredMenu } from 'primereact/tieredmenu';
import {Dropdown} from "primereact/dropdown";
import TreeNode from "primereact/treenode";
import {Tree, TreeEventNodeParams} from "primereact/tree";
import * as jsonpath from "jsonpath";
import {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../primereact";
import localValidator from "@rjsf/validator-ajv8";
import CtimsObjectFieldTemplate from "../custom-rjsf-templates/CtimsObjectFieldTemplate";
import {RegistryWidgetsType} from "@rjsf/utils";
import CtimsInput from "../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../custom-rjsf-templates/CtimsDropdown";

enum EComponentType {
  None,
  ClinicalForm,
  GenomicForm
}

const Form = withTheme(PrimeTheme)

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
}

interface IFormProps {
  formDataChanged: (formData: any) => void;
  formD: any;
}

interface IMarchMenuAndFormProps {
  onMenuNodeClick: (componentType: EComponentType, node: TreeNode) => void;
  formDataChanged: (formData: any) => void
}

const incrementKey = (key: string): string => {
  // key is of the form '0-0'
  const keyParts = key.split('-');
  const lastKeyPart = keyParts[keyParts.length - 1];
  const newLastKeyPart = parseInt(lastKeyPart) + 1;
  keyParts[keyParts.length - 1] = newLastKeyPart.toString();
  return keyParts.join('-');
}

const updateFormDataInNodeByKey = (tree: TreeNode, key: string, formData: any) => {
  const traverse = (tree: TreeNode, key: string, formData: any) => {
    if (tree.key === key) {
      tree.data.formData = formData;
    }
    if (tree.children) {
      tree.children.forEach((child) => {
        traverse(child, key, formData);
      });
    }
  };
  traverse(tree, key, formData);
}

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<any>(null);
  const [expandedKeys, setExpandedKeys] = useState({0: true});
  const [rootNodes, setRootNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [componentType, setComponentType] = useState<EComponentType>(EComponentType.None);
  const [formData, setFormData] = useState<any>({});


  const ClinicalForm = memo((props: IFormProps) => {
    const {formDataChanged, formD} = props
    // console.log('ClinicalForm rootNodes: ', rootNodes)
    console.log('ClinicalForm formD: ', formD)

    const widgets: RegistryWidgetsType = {
      TextWidget: CtimsInput,
      SelectWidget: CtimsDropdown
    }

    const clinicalFormSchema = {
      'type': 'object',
      'required': ['age', 'oncotreePrimaryDiagnosis'],
      'properties': {
        'age': {
          'type': 'string',
          'title': 'Age',
        },
        oncotreePrimaryDiagnosis: {
          'type': 'string',
          'title': 'Oncotree Primary Diagnosis',
        }
      }
    }
    const clinicalUiSchema = {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate
    }

    const onFormChange = (data: any) => {
      formDataChanged(data.formData);
    }

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Clinical" />
        </div>
        <div>
          <Form schema={clinicalFormSchema as JSONSchema7}
                formData={formD}
                uiSchema={clinicalUiSchema}
                widgets={widgets}
                onChange={onFormChange}
                validator={localValidator}/>
        </div>
      </div>
    )
  }, (prevProps, nextProps) => {
    return prevProps.formD === nextProps.formD;
  });

  const GenomicForm = (props: IFormProps) => {
    console.log('GenomicForm rootNodes: ', rootNodes)
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Genomic" />
        </div>
      </div>
    )
  }

  let ComponentToRender: FunctionComponent<IFormProps>;
  switch (componentType) {
    case EComponentType.ClinicalForm:
      ComponentToRender = ClinicalForm;
      break;
    case EComponentType.GenomicForm:
      ComponentToRender = GenomicForm;
      break;
    default:
      ComponentToRender = () => null;
  }

  const buildRootNodes = (rootLabel: string, firstChildLabel: string): TreeNode[] => {
    const r = [
      {
        key: '0',
        label: rootLabel, // AND/OR
        data: {},
        children: [
          {
            key: '0-0',
            label: firstChildLabel, // clinical or genomic or AND/OR
            data: {},
          }
        ]
      }
    ];
    const rootData = r[0].data;
    // @ts-ignore
    rootData[rootLabel.toLowerCase()] = [];
    let type = firstChildLabel.toLowerCase() === 'clinical' ? EComponentType.ClinicalForm : EComponentType.GenomicForm;
    // @ts-ignore
    r[0].children[0].data = {type};
    return r;
  }

  const menuItems = [
    {
      label: 'Clinical',
      command: () => {
        const rootNodes = buildRootNodes('And', 'Clinical');
        setRootNodes(rootNodes);
        setSelectedKeys('0-0')
        const r = jsonpath.query(rootNodes, '$..[?(@.key=="0-0")]');
        if(r.length > 0) {
          setIsEmpty(false);
          console.log('r', r);
          setSelectedNode(r[0]);
          setComponentType(r[0].data.type);
        }
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

  const menu = useRef(null);
  const tieredMenu = useRef(null);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  useEffect(() => {
    console.log('useEffect rootNodes', rootNodes);
    // use jsonpath to find key '0-0' in rootNodes
    // const r = jsonpath.query(rootNodes, '$..[?(@.key=="0-0")]');
    // if(r.length > 0) {
    //   setIsEmpty(false);
    //   console.log('r', r);
    //   setSelectedNode(r[0]);
    //   setComponentType(r[0].data.type);
    // }
  }, [rootNodes])

  const menuClick = (e: any) => {
    // @ts-ignore
    menu.current.show(e);
  }

  const tieredMenuClick = (e: any) => {
    // @ts-ignore
    tieredMenu.current.show(e);
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
  }

  const onNodeSelect = (node: TreeEventNodeParams) => {
    console.log('selectedKeys', selectedKeys);
    console.log('expandedKeys', expandedKeys);
    setSelectedNode(node.node);
  }

  const MatchingMenuAndForm = (props: IMarchMenuAndFormProps) => {
    const {onMenuNodeClick, formDataChanged} = props;
    const [isMouseOverNode, setIsMouseOverNode] = useState(false);

    const findArrayContainingKeyInsideATree = (tree: TreeNode, key: string): TreeNode | null => {
      let result = null;
      const traverse = (tree: TreeNode, key: string) => {
        if (tree.children) {
          tree.children.forEach((child) => {
            if (child.key === key) {
              result = tree;
            }
            traverse(child, key);
          });
        }
      };
      traverse(tree, key);
      return result;
    }

    const addCriteria = (node: TreeNode, type: string) => {
      console.log('rootNodes', rootNodes);
      if (node.key) {
        const parentNode = findArrayContainingKeyInsideATree(rootNodes[0], node.key as string);
        if (parentNode) {
          // get last element from the children
          const lastChild: TreeNode = parentNode.children![parentNode.children!.length - 1];
          const incrementedKey = incrementKey(lastChild.key as string);
          const newNode = {
            key: incrementedKey,
            label: type,
            data: {type: type === 'Clinical' ? EComponentType.ClinicalForm : EComponentType.GenomicForm},
          }
          parentNode.children!.push(newNode);
        }
        setRootNodes([...rootNodes]);
      }

    }

    const nodeTemplate = (node: TreeNode) => {

      const tieredMenuModel = [
        {
          label: 'Add criteria to the same list',
          icon: 'pi pi-plus-circle',
          items: [
            {
              label: 'Clinical',
              command: () => {
                addCriteria(node, 'Clinical');
              }
            },
            {
              label: 'Genomic',
              command: () => {
                addCriteria(node, 'Genomic');
              }
            }
          ]

        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
        },
        {
          separator:true
        },
        {
          label: 'Add criteria subgroup',
          icon: 'pi pi-clone',
          items: [
            {
              label: 'Clinical',
            },
            {
              label: 'Genomic',
            }
          ]
        }
      ]

      const onNodeClick = (e: any) => {
        console.log('nodeClicked !~', node);
        onMenuNodeClick(node.data.type, node);
        // console.log('componentType', componentType);
      }

      if (selectedNode) {
        const btnToShow = () => {
          let show = false;
          if ((selectedNode as TreeNode).key === node.key && isMouseOverNode) {
            show = true;
          }
          show=true
            return show ?
              <Button icon="pi pi-ellipsis-h"
                      className={styles.treeMenuBtn}
                      iconPos="right" onClick={tieredMenuClick} ></Button> : null
        }

        let label = <b>{node.label}</b>;
        return (
          <>
            <div className={styles.treeNodeContainer}
                 // onMouseOver={() => setIsMouseOverNode(true)}
                 // onMouseOut={() => setIsMouseOverNode(false)}
            >
              <span className="p-treenode-label" onClick={onNodeClick} style={{width: '80%'}}>
                {label}
              </span>
              {btnToShow()}
              <TieredMenu model={tieredMenuModel} popup ref={tieredMenu} />
            </div>

          </>
        );
      }
      return null;
    }

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
                  nodeTemplate={nodeTemplate}
                  expandedKeys={expandedKeys}
                  selectionKeys={selectedKeys}
                  selectionMode="single"
                  onSelect={onNodeSelect}
                  onToggle={e => onNodeToggle(e) } />
          </div>
          <div className={styles.matchingCriteriaFormContainer}>
            {isEmpty ? <EmptyForm /> : <ComponentToRender formDataChanged={formDataChanged} formD={formData}/>}
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

  const setNewComponentType = (componentType: EComponentType, node: TreeNode) => {
    console.log('componentType', node)
    setComponentType(componentType);
    setFormData(node.data.formData)
    setSelectedNode({...selectedNode, ...node});
  }

  const updateFormDataForSelectedNode = (formData: any) => {
    const rootNode = rootNodes[0];
    updateFormDataInNodeByKey(rootNode, selectedNode.key, formData);
    // setFormData(formData)
    console.log('rootNode update', rootNodes);
  }

  return (
    <Dialog header="<arm_code> matching criteria" footer={footer} visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm onMenuNodeClick={setNewComponentType} formDataChanged={updateFormDataForSelectedNode}/>
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
