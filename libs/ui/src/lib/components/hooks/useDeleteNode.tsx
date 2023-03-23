import { useDispatch, useSelector } from 'react-redux';
import TreeNode from 'primereact/treenode';
import { RootState, store } from '../../../../../../apps/web/store/store';
import { structuredClone } from 'next/dist/compiled/@edge-runtime/primitives/structured-clone';
import { deleteNodeFromChildrenArrayByKey } from '../helpers';
import {
  deleteMatchDialogError,
  deleteNode,
  IDeleteCriteria
} from '../../../../../../apps/web/store/slices/modalActionsSlice';
import { useEffect, useState } from 'react';
import { EComponentType } from '../EComponentType';
import { updateReduxViewModelAndCtmlModel } from './common';

export const useDeleteNode = (rootNodes: TreeNode[],
                              onTreeNodeClick: (componentType: EComponentType, note: TreeNode) => void) => {

  const [treeViewModel, setTreeViewModel] = useState<TreeNode[]>([]);

  const nodeKeyToBeDeleted: IDeleteCriteria = useSelector((state: RootState) => state.modalActions.deleteCriteria);

  const dispatch = useDispatch();

  useEffect(() => {
    if (nodeKeyToBeDeleted.nodeKey) {
      const newRootNodes = structuredClone(rootNodes);
      deleteNodeFromChildrenArrayByKey(newRootNodes[0], nodeKeyToBeDeleted.nodeKey);
      setTreeViewModel(newRootNodes)
      // after deleting a node we set the component to none
      onTreeNodeClick(EComponentType.None, newRootNodes[0]);
      const state = store.getState();
      updateReduxViewModelAndCtmlModel(newRootNodes, state, dispatch);

      dispatch(deleteMatchDialogError(nodeKeyToBeDeleted.nodeKey))
      dispatch(deleteNode({nodeKey: ''}));
    }
  }, [nodeKeyToBeDeleted]);

  return treeViewModel;
}
