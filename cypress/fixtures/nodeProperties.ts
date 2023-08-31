import type { NodeProperty } from "../../src/lib/types";

const stringProperty: NodeProperty = {
  key: "stringPropertyKey",
  value: "stringPropertyValue",
  type: "string",
};

const numberProperty: NodeProperty = {
  key: "numberPropertyKey",
  value: 42,
  type: "number",
};

const booleanProperty: NodeProperty = {
  key: "booleanPropertyKey",
  value: true,
  type: "boolean",
};

const nullProperty: NodeProperty = {
  key: "nullPropertyKey",
  value: "null",
  type: "null",
};

const arrayPropertyWithStrings: NodeProperty = {
  key: "arrayPropertyKey",
  value: "arrayPropertyValue1",
  type: "string",
  array: {
    data: ["arrayPropertyValue1", "arrayPropertyValue2"],
    index: 0,
    length: 2,
  },
};

const arrayPropertyWithNumbers: NodeProperty = {
  key: "arrayPropertyKey",
  value: 42,
  type: "number",
  array: {
    data: [42, 43],
    index: 0,
    length: 2,
  },
};

const arrayPropertyWithBooleans: NodeProperty = {
  key: "arrayPropertyKey",
  value: true,
  type: "boolean",
  array: {
    data: [true, false],
    index: 0,
    length: 2,
  },
};

const arrayPropertyWithNulls: NodeProperty = {
  key: "arrayPropertyKey",
  value: "null",
  type: "null",
  array: {
    data: ["null", "null"],
    index: 0,
    length: 2,
  },
};

const arrayPropertyWithObjects: NodeProperty = {
  key: "arrayPropertyKey",
  value: "object",
  type: "object",
  array: {
    data: ["object", "object"],
    index: 0,
    length: 2,
  },
};

const arrayPropertyWithArrays: NodeProperty = {
  key: "arrayPropertyKey",
  value: "array",
  type: "array",
  array: {
    data: ["array", "array"],
    index: 0,
    length: 2,
  },
};

const arrayPropertyWithEmptyArray: NodeProperty = {
  key: "arrayPropertyKey",
  value: "empty array",
  type: "emptyArray",
  array: {
    data: [],
    index: 0,
    length: 0,
  },
};

const arrayPropertyWithMixedTypes: NodeProperty = {
  key: "arrayPropertyKey",
  value: "array",
  type: "array",
  array: {
    data: ["array", 42, true, "null", "object", "array"],
    index: 0,
    length: 6,
  },
};

const objectProperty: NodeProperty = {
  key: "objectPropertyKey",
  value: "object",
  type: "object",
};

export {
  stringProperty,
  numberProperty,
  booleanProperty,
  nullProperty,
  arrayPropertyWithStrings,
  arrayPropertyWithNumbers,
  arrayPropertyWithBooleans,
  arrayPropertyWithNulls,
  arrayPropertyWithObjects,
  arrayPropertyWithArrays,
  arrayPropertyWithEmptyArray,
  arrayPropertyWithMixedTypes,
  objectProperty,
};
