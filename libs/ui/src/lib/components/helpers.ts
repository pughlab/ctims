import TreeNode from "primereact/treenode";
import {EComponentType} from "./EComponentType";
import { v4 as uuidv4 } from 'uuid';
import {ErrorSchema, RJSFValidationError} from "@rjsf/utils";

interface JsonObject {
  [key: string]: any;
}

export const stringContains = (str: string, search: string) => {
  return str.toLowerCase().indexOf(search.toLowerCase()) !== -1;
}

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

export const findObjectByKeyInTree = (tree: TreeNode, key: string) => {
  let result: any = null;
  const traverse = (tree: TreeNode, key: string) => {
    if (tree.key === key) {
      result = tree;
    }
    if (tree.children) {
      tree.children.forEach((child: TreeNode) => {
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

export const createSubGroupKey = (key: string) => {
  const keyParts = key.split('-');
  const newKeyParts = keyParts.map((keyPart) => {
    return '0';
  });
  newKeyParts.push('0');
  return newKeyParts.join('-');
}

export const buildEmptyGroup = (label: string): TreeNode[] => {
  const r = [
    {
      key: '0',
      label: label, // AND/OR
      icon: label.toLowerCase() === 'and' ? 'and-icon' : 'or-icon',
      data: {type: EComponentType.AndOROperator},
      children: []
    }
  ];
  return r;
}

export const buildRootNodes = (rootLabel: string, firstChildLabel: string): TreeNode[] => {
  const r = [
    {
      key: '0',
      label: rootLabel, // AND/OR
      data: {type: EComponentType.AndOROperator},
      children: [
        {
          key: uuidv4(),
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

export const convertTreeNodeArrayToCtimsFormat = (input: any[]): any => {
  let result: any = { match: [] };
  input.forEach((item: any) => {
    let current: any = {};
    switch (item.label) {
      case "And":
        current = { and: [] };
        break;
      case "Or":
        current = { or: [] };
        break;
      case "Clinical":
        current = { clinical: item.data.formData || {} };
        break;
      case "Genomic":
        current = { genomic: item.data.formData || {} };
        break;
    }
    if (item.children) {
      current[Object.keys(current)[0]] = [...current[Object.keys(current)[0]], ...convertTreeNodeArrayToCtimsFormat(item.children).match];
    }
    result.match.push(current);
  });
  return result;
}

export const convertCtimsFormatToTreeNodeArray = (output: any, isParent = true): TreeNode[] => {
  let parentKey = isParent ? "0" : uuidv4();
  let result: TreeNode[] = [];
  output.match.forEach((item: any) => {
    let current: any = {};
    switch (Object.keys(item)[0]) {
      case "and":
        current = { key: parentKey, label: "And", data: { and: [] }, children: [], icon: 'and-icon' };
        break;
      case "or":
        current = { key: parentKey, label: "Or", data: {}, children: [], icon: 'or-icon' };
        break;
      case "clinical":
        current = { key: uuidv4(), label: "Clinical", data: { type: EComponentType.ClinicalForm, formData: item.clinical }, icon: 'clinical-icon in-tree' };
        break;
      case "genomic":
        current = { key: uuidv4(), label: "Genomic", data: { type: EComponentType.GenomicForm, formData: item.genomic }, icon: 'genomic-icon in-tree' };
        break;
    }
    if (item[Object.keys(item)[0]].length > 0) {
      current.children = [...current.children, ...convertCtimsFormatToTreeNodeArray({ match: item[Object.keys(item)[0]] }, false)];
    }
    result.push(current);
  });
  return result;
}

export const isObjectEmpty = (obj: any) => {
  if (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  return true;
}

export const extractErrors = (errors: RJSFValidationError[]): string[] => {
  const keyToStringDict: any = {
    trialInformation: 'Trial information',
    prior_treatment_requirements: 'Prior treatment requirements',
    drug_list: 'Drug list',
    age: 'Age',
    management_group_list: 'Management group list',
    site_list: 'Site list',
    sponsor_list: 'Sponsor list',
    staff_list: 'Staff list',
    treatment_list: 'Treatment list',
    age_group: 'Age group'
  }

  const groupedObjects: { [key: string]: RJSFValidationError[] } = errors.reduce((acc: any, obj) => {
    const propertyMatch = obj.property?.match(/\.(.*?)\./);
    if (propertyMatch) {
      const property = propertyMatch[1];
      if (acc[property]) {
        acc[property].push(obj);
      } else {
        acc[property] = [obj];
      }
    }
    return acc;
  }, {});

  const errorStrings: string[] = [];
  for (let key in groupedObjects) {
    const errorLength = groupedObjects[key].length;
    const groupString = keyToStringDict[key];
    errorStrings.push(`${groupString} has ${errorLength} missing field${errorLength === 1 ? '' : 's'}`);
  }

  return errorStrings;
}
