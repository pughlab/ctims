import {Tree, TreeEventNodeParams} from "primereact/tree";
import React, {useRef, useState} from "react";
import TreeNode from "primereact/treenode";
import {Button} from "primereact/button";
import styles from "./CtimsMatchDialog.module.scss";
import {TieredMenu} from "primereact/tieredmenu";
import {buildRootNodes, findArrayContainingKeyInsideATree, incrementKey} from "./helpers";
import {Menu} from "primereact/menu";
import * as jsonpath from "jsonpath";
import {EComponentType} from "./EComponentType";

interface ILeftMenuComponentProps {
  emitComponentType: (componentType: EComponentType) => void;
}


const LeftMenuComponent = (props: ILeftMenuComponentProps) => {

  const {emitComponentType} = props;

  const [rootNodes, setRootNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedKeys, setSelectedKeys] = useState<any>(null);
  const [expandedKeys, setExpandedKeys] = useState({0: true});
  const [isMouseOverNode, setIsMouseOverNode] = useState(false);

  const tieredMenu = useRef(null);
  const menu = useRef(null);

  const menuItems = [
    {
      label: 'Clinical',
      command: () => {
        const rootNodes = buildRootNodes('And', 'Clinical');
        setRootNodes(rootNodes);
        setSelectedKeys('0-0')
        const r = jsonpath.query(rootNodes, '$..[?(@.key=="0-0")]');
        if(r.length > 0) {
          // setIsEmpty(false);
          console.log('r', r);
          setSelectedNode(r[0]);
          // setComponentType(r[0].data.type);
          emitComponentType(r[0].data.type);
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

  const tieredMenuClick = (e: any) => {
    // @ts-ignore
    tieredMenu.current.show(e);
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
      // onMenuNodeClick(node.data.type, node);
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

  const onNodeSelect = (node: TreeEventNodeParams) => {
    console.log('selectedKeys', selectedKeys);
    console.log('expandedKeys', expandedKeys);
    setSelectedNode(node.node);
  }

  const onNodeToggle = (e: any) => {
    console.log('selectedKeys', selectedKeys);
    setExpandedKeys(e.value)
  }

  return (
    <>
      <Menu model={menuItems} ref={menu} popup id="criteria_popup_menu"/>
      <Tree value={rootNodes}
            nodeTemplate={nodeTemplate}
            expandedKeys={expandedKeys}
            selectionKeys={selectedKeys}
            selectionMode="single"
            onSelect={onNodeSelect}
            onToggle={e => onNodeToggle(e) } />
    </>

    )

}
export default LeftMenuComponent;
