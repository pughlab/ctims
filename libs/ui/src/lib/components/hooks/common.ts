import TreeNode from 'primereact/treenode';
import { RootState } from '../../../../../../apps/web/store/store';
import { IKeyToViewModel, setMatchViewModel } from '../../../../../../apps/web/store/slices/matchViewModelSlice';
import { structuredClone } from 'next/dist/compiled/@edge-runtime/primitives/structured-clone';
import { convertTreeNodeArrayToCtimsFormat } from '../helpers';
import { setCtmlDialogModel } from '../../../../../../apps/web/store/slices/modalActionsSlice';

export const updateReduxViewModelAndCtmlModel = (newRootNodes: TreeNode[], state: RootState, dispatch: any) => {
  const activeArmId: string = state.matchViewModelActions.activeArmId;
  const viewModel: IKeyToViewModel = {};
  viewModel[activeArmId] = structuredClone(newRootNodes);
  dispatch(setMatchViewModel(viewModel))
  // convert view model (rootNodes) to ctims format
  const ctimsFormat = convertTreeNodeArrayToCtimsFormat(newRootNodes);
  dispatch(setCtmlDialogModel(ctimsFormat));
}
