import type { TreeEdge } from "../../src/lib/types";

const objectEdge: TreeEdge = {
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 10,
  type: "object",
};

const offsetStartObjectEdge: TreeEdge = {
  ...objectEdge,
  x1: 5,
  y1: 5,
};

const offsetEndObjectEdge: TreeEdge = {
  ...objectEdge,
  x2: 5,
  y2: 5,
};

const arrayEdge: TreeEdge = {
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 10,
  type: "array",
};

const offsetStartArrayEdge: TreeEdge = {
  ...arrayEdge,
  x1: 5,
  y1: 5,
};

const offsetEndArrayEdge: TreeEdge = {
  ...arrayEdge,
  x2: 5,
  y2: 5,
};

export {
  objectEdge,
  offsetStartObjectEdge,
  offsetEndObjectEdge,
  arrayEdge,
  offsetStartArrayEdge,
  offsetEndArrayEdge,
};
