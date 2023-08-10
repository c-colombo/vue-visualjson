import type { TreeNode } from "../../src/lib/types";
import {
  stringProperty,
  numberProperty,
  booleanProperty,
  nullProperty,
  objectProperty,
  arrayPropertyWithStrings,
  arrayPropertyWithNumbers,
  arrayPropertyWithBooleans,
  arrayPropertyWithNulls,
  arrayPropertyWithObjects,
  arrayPropertyWithArrays,
} from "./nodeProperties";

const objectNode: TreeNode = {
  type: "object",
  x: 0,
  y: 0,
  properties: [
    stringProperty,
    numberProperty,
    booleanProperty,
    nullProperty,
    objectProperty,
    arrayPropertyWithStrings,
    arrayPropertyWithNumbers,
    arrayPropertyWithBooleans,
    arrayPropertyWithNulls,
    arrayPropertyWithObjects,
    arrayPropertyWithArrays,
  ],
};

const offsetObjectNode: TreeNode = {
  ...objectNode,
  x: 5,
  y: 5,
};

const arrayNode: TreeNode = {
  type: "array",
  x: 0,
  y: 0,
  properties: [
    {
      key: "1",
      value: "value1",
      type: "string",
    },
    {
      key: "2",
      value: "value2",
      type: "string",
    },
    {
      key: "3",
      value: "value3",
      type: "string",
    },
  ],
};

const offsetArrayNode: TreeNode = {
  ...arrayNode,
  x: 5,
  y: 5,
};

export { objectNode, offsetObjectNode, arrayNode, offsetArrayNode };
