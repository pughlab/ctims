import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../../../../apps/web/store/store';
import { useEffect, useState } from 'react';
import { convertCtimsFormatToTreeNodeArray, isObjectEmpty } from '../helpers';
import TreeNode from 'primereact/treenode';
import { updateReduxViewModelAndCtmlModel } from './common';

export const useFormChangeCounter = (rootNodes: TreeNode[]) => {
  const formChangedCounter: number = useSelector((state: RootState) => state.modalActions.formChangeCounter);
  const [treeViewModel, setTreeViewModel] = useState<TreeNode[]>([]);

  const dispatch = useDispatch();

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
          setTreeViewModel(newViewModel)
        }
      }
    }

    // if the form was changed, update the redux store with the new view model and ctims format
    if (formChangedCounter > 0) {
      console.log('form changed in left menu component');
      updateReduxViewModelAndCtmlModel(rootNodes, state, dispatch);
    }
  }, [formChangedCounter]);

  return treeViewModel;
}
