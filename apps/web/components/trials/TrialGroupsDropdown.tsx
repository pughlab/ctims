import { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useDispatch } from 'react-redux';
import { selectedTrialGroupId } from './../../store/slices/contextSlice';
export const TrialGroupsDropdown = (props: {roles?: string[], onTrialGroupSelected: (selectedTrialGroup: {role: string, code: string}) => void}) => {

    const [trialGroups, setTrialGroups] = useState<any>([]);
    const [selectedTrialGroup, setSelectedTrialGroup] = useState<any>(null);

    const dispatch = useDispatch();

    useEffect(() => {
      const tg = props.roles.map((role) => {
        let result: {name: string, code: string} = null
        if (role.includes('admin')) {
          const plainRole = role.replace('-admin', '');
          result = {name: plainRole + ' (Admin)', code: role};
          return result;
        }

        return {name: role, code: role};

      });
      setTrialGroups(tg)
    }, [props.roles]);

    const onTrialGroupSelected = (selectedTrialGroup: {role: string, code: string}) => {
      const plainRole = selectedTrialGroup.code.replace('-admin', '');
      dispatch(selectedTrialGroupId(plainRole))
      setSelectedTrialGroup(selectedTrialGroup);
      props.onTrialGroupSelected(selectedTrialGroup);
    }

    return (
        <div>
          <Dropdown value={selectedTrialGroup} onChange={(e) => onTrialGroupSelected(e.value)} options={trialGroups} optionLabel="name"
                    placeholder="Select a Trial Group" className="w-full md:w-14rem" />
        </div>
    )
}
export default TrialGroupsDropdown;
