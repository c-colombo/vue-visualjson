export type NodeProperty = {
  key: string;
  value: string | number | boolean | null | Array<any> | object;
  type: string;
  array?: {
    data: Array<any>;
    index: number;
    length: number;
  };
};

export type TreeNode = {
  type: string;
  x: number;
  y: number;
  properties: NodeProperty[];
};

export type TreeEdge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: string;
};

export type TreeTier = {
  height: number;
  nodes: TreeNode[];
  edgesStart: TreeEdge[];
  edtesEnd: TreeEdge[];
  yOffSet: number;
};

export type TreeData = {
  nodes: TreeNode[];
  edges: TreeEdge[];
  height: number;
  width: number;
};

export type Formatting = {
  collapseArrays: boolean;
  colorcodeEdges: boolean;
  colorcodeNodes: boolean;
  typeLabels: boolean;
  textSize: number;
  lineSpacing: number;
  nodePaddingVertical: number;
  nodePaddingHorizontal: number;
  nodeWidth: number;
  nodeSpacingVertical: number;
  tierSpacingHorizontal: number;
};

export type ControlPanelItem = {
  type: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
};
