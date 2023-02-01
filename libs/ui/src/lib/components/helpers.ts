import TreeNode from "primereact/treenode";
import {EComponentType} from "./EComponentType";

export const findArrayContainingKeyInsideATree = (tree: TreeNode, key: string): TreeNode | null => {
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

export const incrementKey = (key: string): string => {
  // key is of the form '0-0'
  const keyParts = key.split('-');
  const lastKeyPart = keyParts[keyParts.length - 1];
  const newLastKeyPart = parseInt(lastKeyPart) + 1;
  keyParts[keyParts.length - 1] = newLastKeyPart.toString();
  return keyParts.join('-');
}

export const buildRootNodes = (rootLabel: string, firstChildLabel: string): TreeNode[] => {
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

export const updateFormDataInNodeByKey = (tree: TreeNode, key: string, formData: any) => {
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

export const makePropertiesWritable = (obj: any) => {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      makePropertiesWritable(obj[prop]);
    }
    Object.defineProperty(obj, prop, { writable: true });
  }
}

export const logReadableWritableProperties = (obj: any) => {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      logReadableWritableProperties(obj[prop]);
    }
    console.log('logReadableWritableProperties: ' + prop, Object.getOwnPropertyDescriptor(obj, prop));
  }
}

export const deleteNodeFromChildrenArrayByKey = (tree: TreeNode, key: string) => {
  const traverse = (tree: TreeNode, key: string) => {
    if (tree.children) {
      const indexToDelete = tree.children.findIndex((child) => child.key === key);
      if (indexToDelete !== -1) {
        tree.children.splice(indexToDelete, 1);
      }
      tree.children.forEach((child) => {
        traverse(child, key);
      });
    }
  };
  traverse(tree, key);
}
