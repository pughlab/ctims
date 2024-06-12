import TreeNode from "primereact/treenode";
import {EComponentType} from "./EComponentType";
import {v4 as uuidv4} from 'uuid';
import {RJSFValidationError} from "@rjsf/utils";
import {OperatorOptions} from "./forms/OperatorDropdown";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";


// Must be in the following format: 'p.A1'
// string must start with 'p.' followed by a capital letter and then a one or more digits
export const wildcard_protein_change_validation_func = (str: string) => {
  const regex = /^p\.[A-Z]\d+$/;
  if (!str) {
    return true;
  }
  return regex.test(str);
}

export const protein_change_validation_func = (str: string) => {
  const regex = /^p\.(([A-Z]\d+_[A-Z]\d+)(del$|dup$)|([A-Z]\d+_[A-Z]\d+)(ins[A-Z]+\*?|ins\*\d*|delins[A-Z]+\*?|delins\*\d*|fs\*?\d*)|([A-Z]\d+[A-Z])$|([A-Z]\d+[A-Z])(fs\*?\d*)$|([A-Z]\d+)(\*)$|([A-Z]\d+)(del$|dup$)|([A-Z]\d+)(delins[A-Z]+\*?$|fs\*?(\d*))$)$/;

  if (!str) {
    return true;
  }
  return regex.test(str);
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

// given a tree node, find all the keys of its leaf nodes
export const traverseNode = (tree: TreeNode, key: string): string[] => {
  let result: string[] = [];
  const traverse = (tree: TreeNode, key: string) => {
    if (tree.children) {
      tree.children.forEach((child) => {
        traverse(child, key);
      });
    } else {
      result.push(tree.key as string);
    }
  }
  traverse(tree, key);
  return result;
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
        current = { key: uuidv4(), label: "And", data: { and: [] }, children: [], icon: 'and-icon' };
        break;
      case "or":
        current = { key: uuidv4(), label: "Or", data: {}, children: [], icon: 'or-icon' };
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

/**
 * Get the current operator based on the provided root nodes and the current node.
 * If the current node's parent has a label of "OR", it returns the OR operator, otherwise returns the AND operator.
 * @param {TreeNode[]} rootNodes - An array of root nodes representing the tree.
 * @param {TreeNode} currentNode - The current node for which the operator needs to be determined.
 * @returns {OperatorOptions} The current operator (AND or OR).
 */
export const getCurrentOperator = (rootNodes: TreeNode[], currentNode: TreeNode) => {
  if (currentNode && rootNodes.length > 0) {
    // Find the parent node of the current node within the tree.
    const parentNode = findArrayContainingKeyInsideATree(rootNodes[0], currentNode.key as string);
    if (parentNode && parentNode.label) {
      // Check if the parent node's label is "OR" (case-insensitive).
      if (parentNode.label.toLowerCase() === 'or') {
        return OperatorOptions.OR;
      }
    }
  }
  return OperatorOptions.AND;
}

// sort the children of the root nodes by node.data's type property, clinical first, genomic second, and and/or last
// add a depth property to each node that's used at rendering time
export const sortTreeNode = (treeNode: TreeNode, currentDepth: number = 0): TreeNode => {
  // recursively calls itself and use map to sort the current level of node
  if (typeof treeNode !== "undefined" && treeNode.children) {
    treeNode.data.depth = currentDepth;

    // recursively calls the next level to sort the next level children
    treeNode.children = treeNode.children.map(child => sortTreeNode(child, currentDepth + 1));

    // add an index to track original order
    treeNode.children.forEach((child, index) => {
      child.data.originalIndex = index;
    });

    // sort the current level
    treeNode.children.sort((a, b) => {
      let ret = 0;
      if (a.data.type === b.data.type) {
        if (a.data.nodeLabel && b.data.nodeLabel) {
          ret = a.data.nodeLabel.localeCompare(b.data.nodeLabel);
        } else {
          ret = a.data.originalIndex - b.data.originalIndex;
        }
      } else if (a.data.type === EComponentType.ClinicalForm) {
        ret = -1;
      } else if (a.data.type === EComponentType.GenomicForm) {
        if (b.data.hasOwnProperty('type') && b.data.type === EComponentType.ClinicalForm) {
          ret = 1;
        } else if (!b.data.hasOwnProperty('type') || b.data.type === EComponentType.AndOROperator) {
          ret = -1;
        }
      } else if (!a.data.hasOwnProperty('type') || b.data.type === EComponentType.AndOROperator) {
        ret = 1;
      } else {
        if (a.data.nodeLabel && b.data.nodeLabel) {
          ret = a.data.nodeLabel.localeCompare(b.data.nodeLabel);
        } else {
          ret = 0;
        }
      }
      return ret;
    });
  } else if (typeof treeNode !== "undefined") {
    treeNode.data.depth = currentDepth;
  }

  return treeNode;
}

export const sortCTMLModelMatchCriteria = (ctmlMatchCriteria: any): { match: [] } => {
  let criteriaCopy = structuredClone(ctmlMatchCriteria.match);

  // convert the criteria to tree node format
  let treeNode = convertCtimsFormatToTreeNodeArray({match: criteriaCopy});
  // add the node label to each node so it can be sorted
  traverseAndAddNodeLabel(treeNode[0]);

  let sorted = sortTreeNode(treeNode[0]);

  // convert the sorted tree node back to ctml format
  const sortedCtimsFormat = convertTreeNodeArrayToCtimsFormat([sorted]);
  return sortedCtimsFormat;
}

// traverse the tree and add the node label to each node
const traverseAndAddNodeLabel = (treeNode: TreeNode): TreeNode => {
  if (typeof treeNode !== "undefined" && treeNode.children) {
    treeNode.children = treeNode.children.map(traverseAndAddNodeLabel);
    if (treeNode.label === 'Clinical' || treeNode.label === 'Genomic') {
      treeNode.data.nodeLabel = getNodeLabel(treeNode);
    }
  } else {
    if (treeNode.label === 'Clinical' || treeNode.label === 'Genomic') {
      treeNode.data.nodeLabel = getNodeLabel(treeNode);
    }
  }
  return treeNode;
}

// figure out a label for criteria node according to CTM-394
export const getNodeLabel = (node: TreeNode): string => {
  let label;
  if (node.label === 'Clinical' && node.data.formData) {
    const { tmb, oncotree_primary_diagnosis, er_status, pr_status, her2_status, age_expression } = node.data.formData;
    if (tmb) {
      label = 'TMB';
    } else if (oncotree_primary_diagnosis) {
      label = oncotree_primary_diagnosis;
    } else if (er_status || pr_status || her2_status) {
      const statusLabels = [];
      if (er_status) statusLabels.push('ER');
      if (pr_status) statusLabels.push('PR');
      if (her2_status) statusLabels.push('HER2');
      label = statusLabels.join(', ');
    } else if (age_expression) {
      label = age_expression;
    }
  } else if (node.label === 'Genomic' && node.data.formData) {
    let genomicObj = node.data.formData;
    if (node.data.formData.variantCategoryContainerObject) {
      genomicObj = node.data.formData.variantCategoryContainerObject;
    }
    const { ms_status, hugo_symbol} = genomicObj;
    if (ms_status) {
      label = ms_status;
    } else if (hugo_symbol) {
      label = hugo_symbol;
    }
  }
  return label;
}

/*
  recursively go through tree nodes, if it has the key 'variantCategoryContainerObject',
  flatten the object so it matches the format of the CTML
   */
export const flattenVariantCategoryContainerObject = (nodes: TreeNode[]) => {
  return nodes.map((node: TreeNode) => {
    const newNode = {...node};
    if (newNode.data && newNode.data.formData && newNode.data.formData.variantCategoryContainerObject) {
      newNode.data.formData = newNode.data.formData.variantCategoryContainerObject;
    }
    if (newNode.children) {
      newNode.children = flattenVariantCategoryContainerObject(newNode.children);
    }
    return newNode;
  });
}

 // Recursively traverse through the match criteria and add the variantCategoryContainerObject key to the genomic object
export const addVariantCategoryContainerObject = (matchCriteria: any[]) => {
  return matchCriteria.map((criteria) => {
    if (criteria.and || criteria.or) {
      const operator = criteria.and ? 'and' : 'or';
      const children = criteria[operator];
      const ret: { [key in 'and' | 'or']?: any[] } = {};
      ret[operator] = addVariantCategoryContainerObject(children);
      return ret;
    } else if (criteria.genomic) {
      if (!criteria.genomic.variantCategoryContainerObject) {
        const c: any = {
          genomic: {
            variantCategoryContainerObject: criteria.genomic
          }
        }
        return c;
      }
      return criteria;
    } else {
      // clinical node, no need to modify
      return criteria;
    }
  })
}

// function to recursively trim all CtimsInput fields, and remove the key if value is empty after trim
export const trimFields = (obj: any) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      trimFields(obj[key]);
    } else if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
      if (obj[key] === '') {
        delete obj[key];
      }
    }
  }
}
