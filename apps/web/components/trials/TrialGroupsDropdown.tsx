import { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
export const TrialGroupsDropdown = (props: {roles?: string[], onTrialGroupSelected: (selectedTrialGroup: string) => void}) => {

    const [trialGroups, setTrialGroups] = useState<any>([]);
    const [selectedTrialGroup, setSelectedTrialGroup] = useState<any>(null);

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

    const onTrialGroupSelected = (selectedTrialGroup: string) => {
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
