import {useDispatch} from "react-redux";
import {
  addAdjacentNode,
  deleteNode,
} from "../../../../../../apps/web/store/slices/modalActionsSlice";
import styles from "../MatchingMenuAndForm.module.scss";
import {Button} from "primereact/button";
import React from "react";
import TreeNode from "primereact/treenode";

export interface ITitleContainerProps {
  title: string;
  node: TreeNode;
}

export const TitleContainer = (props: ITitleContainerProps) => {
  const {title, node} = props;

  const dispatch = useDispatch();

  const onAddCriteria = () => {
    dispatch(addAdjacentNode({nodeKey: node.key as string, type: title}));
  }

  const onDeleteCriteria = () => {
    dispatch(deleteNode({nodeKey: node.key as string}));
  }

  const deleteButtonClasses = `p-button-text p-button-plain p-button-danger ${styles.deleteButton}`;
  const addCriteriaButtonClasses = `p-button-text p-button-plain ${styles.addCriteriaToSameListButton}`;

  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleContainerText}>
        {title}
      </div>
      <Button icon="pi pi-trash"
              label="Delete"
              iconPos="left"
              className={deleteButtonClasses}
              onClick={onDeleteCriteria}
      />
      <Button icon="pi pi-plus-circle"
              label="Add criteria to the same list"
              iconPos="left"
              className={addCriteriaButtonClasses}
              onClick={onAddCriteria}
      />
    </div>
  )
}
