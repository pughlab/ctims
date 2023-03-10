import styles from "./LeftMenuComponent.module.scss";
import {Tree, TreeEventNodeParams} from "primereact/tree";
import React, {memo, useEffect, useRef, useState} from "react";
import TreeNode from "primereact/treenode";
import {Button} from "primereact/button";
import {TieredMenu} from "primereact/tieredmenu";
import {
  buildEmptyGroup,
  buildRootNodes,
  convertCtimsFormatToTreeNodeArray,
  convertTreeNodeArrayToCtimsFormat,
  deleteNodeFromChildrenArrayByKey,
  findArrayContainingKeyInsideATree,
  findObjectByKeyInTree,
  isObjectEmpty
} from "./helpers";
import * as jsonpath from "jsonpath";
import {EComponentType} from "./EComponentType";
import {IRootNode} from "./MatchingMenuAndForm";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteNode,
  IAddCriteria,
  IDeleteCriteria,
  IOperatorChange, operatorChange,
  setCtmlDialogModel
} from "../../../../../apps/web/store/slices/modalActionsSlice";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import {v4 as uuidv4} from 'uuid';
import {IKeyToViewModel, setMatchViewModel} from "../../../../../apps/web/store/slices/matchViewModelSlice";
import {RootState, store} from "../../../../../apps/web/store/store";


interface ILeftMenuComponentProps {
  onTreeNodeClick: (componentType: EComponentType, note: TreeNode) => void;
  rootNodesProp: IRootNode;
}

const LeftMenuComponent = memo((props: ILeftMenuComponentProps) => {

  const {onTreeNodeClick, rootNodesProp} = props;

  const [rootNodes, setRootNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedKeys, setSelectedKeys] = useState<any>(null);
  const [expandedKeys, setExpandedKeys] = useState({0: true});

  const newNodeValue: IAddCriteria = useSelector((state: RootState) => state.modalActions.addCriteria);
  const nodeKeyToBeDeleted: IDeleteCriteria = useSelector((state: RootState) => state.modalActions.deleteCriteria);
  const operatorChanged: IOperatorChange = useSelector((state: RootState) => state.modalActions.operatorChange);
  const formChangedCounter: number = useSelector((state: RootState) => state.modalActions.formChangeCounter);

  const dispatch = useDispatch();

  const setRootNodesState = (newRootNodes: TreeNode[]) => {
    setRootNodes(newRootNodes);
    const firstSelectedKey = newRootNodes[0].children![0].key;
    setSelectedKeys(firstSelectedKey)
    const r = jsonpath.query(newRootNodes, `$..[?(@.key=="${firstSelectedKey}")]`);
    if(r.length > 0) {
      setSelectedNode(r[0]);
      onTreeNodeClick(r[0].data.type, r[0]);
    }
  }

  const updateReduxViewModelAndCtmlModel = (newRootNodes: TreeNode[], state: RootState) => {
    const activeArmId: string = state.matchViewModelActions.activeArmId;
    const viewModel: IKeyToViewModel = {};
    viewModel[activeArmId] = structuredClone(newRootNodes);
    dispatch(setMatchViewModel(viewModel))
    // convert view model (rootNodes) to ctims format
    const ctimsFormat = convertTreeNodeArrayToCtimsFormat(newRootNodes);
    dispatch(setCtmlDialogModel(ctimsFormat));
  }

  useEffect(() => {
    const state = store.getState();
    const currentCtmlMatchModel: any = state.matchViewModelActions.ctmlMatchModel;

    // formChangedCounter is used to determine if the dialog just opened or if the form was changed
    if (formChangedCounter === 0) {
      // if the form was not changed, we check if there is a view model in the redux store
      if (!isObjectEmpty(currentCtmlMatchModel.match)) {

        // console.log('currentCtmlMatchModel.match', currentCtmlMatchModel.match)
        if (rootNodes.length === 0) {
          const newViewModel = convertCtimsFormatToTreeNodeArray({match: currentCtmlMatchModel.match});
          setRootNodesState(newViewModel)
        }
      }
    }

    // if the form was changed, update the redux store with the new view model and ctims format
    if (formChangedCounter > 0) {
      console.log('form changed in left menu component');
      updateReduxViewModelAndCtmlModel(rootNodes, state);
    }
  }, [formChangedCounter]);

  useEffect(() => {
    if (newNodeValue && newNodeValue.nodeKey && newNodeValue.type && rootNodes.length > 0) {
      let {nodeKey, type}: {nodeKey: string, type: string} = newNodeValue;

      // Callback when add criteria button is clicked ( the one inside the form )
      addCriteria(nodeKey, type);
    }
  }, [newNodeValue]);

  // when a node is deleted we update the root nodes state
  useEffect(() => {
    if (nodeKeyToBeDeleted.nodeKey) {
      const newRootNodes = structuredClone(rootNodes);
      deleteNodeFromChildrenArrayByKey(newRootNodes[0], nodeKeyToBeDeleted.nodeKey);
      setRootNodesState(newRootNodes)
      // after deleting a node we set the component to none
      onTreeNodeClick(EComponentType.None, newRootNodes[0]);
      const state = store.getState();
      updateReduxViewModelAndCtmlModel(newRootNodes, state);

      dispatch(deleteNode({nodeKey: ''}));
    }
  }, [nodeKeyToBeDeleted]);

  // when the operator is changed we update the label of the node (AND/OR)
  useEffect(() => {
    const state = store.getState();
    if (operatorChanged && operatorChanged.nodeKey && operatorChanged.operator && rootNodes.length > 0) {
      const {nodeKey, operator, location} = operatorChanged;
      if (location === 'form') {
        const parentNode = findArrayContainingKeyInsideATree(rootNodes[0], nodeKey as string);
        // operator to lower case and capitalize first letter
        const newOperator = operator.toLowerCase().charAt(0).toUpperCase() + operator.toLowerCase().slice(1);
        if (parentNode) {
          parentNode.label = newOperator;
        }
        updateReduxViewModelAndCtmlModel(rootNodes, state);
        setRootNodes([...rootNodes]);
      }

      if (location === 'tree') {
        const foundNode = findObjectByKeyInTree(rootNodes[0], nodeKey as string);
        // operator to lower case and capitalize first letter
        const newOperator = operator.toLowerCase().charAt(0).toUpperCase() + operator.toLowerCase().slice(1);
        if (foundNode) {
          foundNode.label = newOperator;
        }
        updateReduxViewModelAndCtmlModel(rootNodes, state);
        setRootNodes([...rootNodes]);
      }

    }
  }, [operatorChanged]);

  const tieredMenu = useRef(null);
  const menu = useRef(null);

  // This prop is set from MatchingMenuAndFormComponent
  useEffect(() => {
    if (rootNodesProp) {
      const {rootLabel, firstChildLabel} = rootNodesProp;
      if (rootLabel && firstChildLabel) {
        if (firstChildLabel === 'Empty Group') {
          const roodNodes = buildEmptyGroup(rootLabel);
          const firstSelectedKey = roodNodes[0].key;
          setRootNodes(roodNodes);
          setSelectedNode(roodNodes[0]);
          setSelectedKeys(firstSelectedKey)
          onTreeNodeClick(EComponentType.None, roodNodes[0]);
        } else {
          const roodNodes = buildRootNodes(rootLabel, firstChildLabel);
          setRootNodesState(roodNodes);
        }

      }
    }
  }, [rootNodesProp]);

  const addCriteria = (nodeKey: string, type: string) => {
    if (nodeKey) {
      const parentNode = findArrayContainingKeyInsideATree(rootNodes[0], nodeKey as string);
      if (parentNode) {
        const newNode = {
          key: uuidv4(),
          label: type,
          data: {type: type === 'Clinical' ? EComponentType.ClinicalForm : EComponentType.GenomicForm},
        }
        parentNode.children!.push(newNode);
      }
      setRootNodes([...rootNodes]);
    }
  }

  const addCriteriaToSameList = (nodeKey: string, type: string) => {
    if (nodeKey) {
      const parentNode = findObjectByKeyInTree(rootNodes[0], nodeKey as string);
      if (parentNode) {
        // get last element from the children
        const newNode = {
          key: uuidv4(),
          label: type,
          data: {type: type === 'Clinical' ? EComponentType.ClinicalForm : EComponentType.GenomicForm},
        }
        parentNode.children!.push(newNode);
      }
      setRootNodes([...rootNodes]);
    }
  }

  const addSubGroup = (nodeKey: string) => {
    if (nodeKey) {
      const parentNode = findObjectByKeyInTree(rootNodes[0], nodeKey as string);
      if (parentNode) {
        const newNode = {
          key: uuidv4(),
          label: 'And',
          data: {},
          children: []
        };
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

    const [isMouseOverNode, setIsMouseOverNode] = useState(false);

    const tieredMenuModel = [
      {
        label: 'Add criteria to same group',
        icon: 'pi pi-plus-circle',
        items: [
          {
            label: 'Clinical',
            command: () => {
              addCriteriaToSameList(selectedNode.key as string, 'Clinical');
            },
            icon: 'clinical-icon'
          },
          {
            label: 'Genomic',
            command: () => {
              addCriteriaToSameList(selectedNode.key as string, 'Genomic');
            },
            icon: 'genomic-icon'
          }
        ]

      },
      {
        label: 'Switch group operator',
        icon: 'pi pi-arrow-right-arrow-left',
        command: () => {
          if (selectedNode.label === 'And') {
            dispatch(operatorChange({nodeKey: selectedNode.key, operator: 'Or', location: 'tree'}));
          } else {
            dispatch(operatorChange({nodeKey: selectedNode.key, operator: 'And', location: 'tree'}));
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => { console.log('delete node selectedNode ', selectedNode) }
      },
      {
        separator:true
      },
      {
        label: 'Add criteria subgroup',
        icon: 'pi pi-clone',
        command: () => { addSubGroup(selectedNode.key) }
      }
    ]

    if (selectedNode) {
      const btnToShow = () => {
        let show = false;
        // we only display the three dots menu over the node if the node is selected and the mouse is over the node and the node is not a leaf
        if ((selectedNode as TreeNode).key === node.key && isMouseOverNode && (node.label === 'And' || node.label === 'Or')) {
          show = true;
        }
        // show=true
        return show ?
          <Button icon="pi pi-ellipsis-h"
                  className={styles.treeMenuBtn}
                  iconPos="right" onClick={tieredMenuClick} ></Button> : null
      }

      let label = <b>{node.label}</b>;
      return (
        <>
          <div className={styles.treeNodeContainer}
            onMouseOver={() => setIsMouseOverNode(true)}
            onMouseOut={() => setIsMouseOverNode(false)}
          >
              <span className="p-treenode-label" style={{width: '80%'}}>
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
    console.log('onNodeSelect', node)
    // console.log('selectedKeys', selectedKeys);
    // console.log('expandedKeys', expandedKeys);
    setSelectedNode(node.node);
    setSelectedKeys(node.node.key as string)
    onTreeNodeClick(node.node.data.type, node.node);
  }

  const onNodeToggle = (e: any) => {
    console.log('selectedKeys', selectedKeys);
    setExpandedKeys(e.value)
  }

  return (
    <>
        <div className={styles.matchingCriteriaMenuContainer}>
          <div className={styles.matchingCriteriaTextContainer}>
            <div className={styles.matchingCriteriaText}>Matching Criteria</div>

          </div>
          <Tree value={rootNodes}
                className="ctims-tree"
                contentClassName="ctims-tree-content"
                nodeTemplate={nodeTemplate}
                expandedKeys={expandedKeys}
                selectionKeys={selectedKeys}
                selectionMode="single"
                onSelect={onNodeSelect}
                onToggle={e => onNodeToggle(e) } />
        </div>
    </>

    )

}, (prevProps, nextProps) => {
  return false;
});
export default LeftMenuComponent;
