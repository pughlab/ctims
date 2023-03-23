import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../../../apps/web/store/store';
import { useEffect, useState } from 'react';
import { convertCtimsFormatToTreeNodeArray, convertTreeNodeArrayToCtimsFormat, isObjectEmpty } from './helpers';
import TreeNode from 'primereact/treenode';
import { IKeyToViewModel, setMatchViewModel } from '../../../../../apps/web/store/slices/matchViewModelSlice';
import { structuredClone } from 'next/dist/compiled/@edge-runtime/primitives/structured-clone';
import { setCtmlDialogModel } from '../../../../../apps/web/store/slices/modalActionsSlice';



export const useFormChangeCounter = (rootNodes: TreeNode[]) => {
  const formChangedCounter: number = useSelector((state: RootState) => state.modalActions.formChangeCounter);
  const [treeViewModel, setTreeViewModel] = useState<TreeNode[]>([]);

  const dispatch = useDispatch();

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
          setTreeViewModel(newViewModel)
        }
      }
    }

    // if the form was changed, update the redux store with the new view model and ctims format
    if (formChangedCounter > 0) {
      console.log('form changed in left menu component');
      updateReduxViewModelAndCtmlModel(rootNodes, state);
    }
  }, [formChangedCounter]);

  return treeViewModel;
}
