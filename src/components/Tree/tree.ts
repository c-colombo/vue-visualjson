import type {
  NodeProperty,
  TreeData,
  TreeNode,
  TreeEdge,
  TreeTier,
  Formatting,
} from "../../lib/types";
import Denque from "denque";

// This is a helper class which is used to parse stringified JSON and create the TreeData to be rendered.
// It implements a number of parametric calculations which take into account current formatting options, determine what nodes and edges to render, and where to render them.

export default class Tree {
  jsonObject: object;

  // This map is used to keep track of the currently selected array index for each array in the JSON object.
  arrayMap: Map<Array<any>, number>;

  // This map keeps track of object which have not been processed and the edges which connect them to their parent.
  // There's probably a better way to do this e.g. using a queue of edges or instancing the TreeNode when it is encountered, storing a reference to the edge in the TreeNode, and then updating the edge when the TreeNode is processed.
  edgesMap: Map<object, TreeEdge>;

  // maxHeight keeps track of the height of the tree, which is used to center the tree vertically.
  maxHeight: number = 0;

  // xPosition and yPosition are used to keep track of the current position of the node being processed and are initialized to the top left corner of the tree.
  xPosition: number = 0;
  yPosition: number = 0;

  // The constructor attempts to parse the JSON string and throws an error if it fails.
  // If it succeeds, it initializes the arrayMap and edgesMap.
  constructor(json: string) {
    try {
      this.jsonObject = JSON.parse(json);
    } catch (e) {
      throw e;
    }
    this.arrayMap = new Map();
    this.edgesMap = new Map();
  }

  // Resets an existing Tree object with a new JSON string, and clears the arrayMap and edgesMap.
  // This occurs when the data prop is updated in Tree.vue.
  reset(json: string): void {
    this.jsonObject = JSON.parse(json);
    this.arrayMap.clear();
    this.edgesMap.clear();
  }

  // The main processing function. It determines the nodes and edges to be rendered, and their positions according to the formatting options passed in.
  // This is called again whenever the formatting options are updated in Tree and the tree needs to be re-rendered in accordance with the new options.
  parseJSON(formatting: Formatting): TreeData {
    // A queue is used for breadth-first traversal of the JSON object.
    const queue = new Denque([this.jsonObject]);
    // Processing keeps track of tiers as each will have specific offsets to be applied to all nodes in the tier, and edges with start or end points in that tier.
    const tiers: TreeTier[] = [];
    this.maxHeight = 0;
    // The xPosition is initialized with an offset of 2 * tierSpacingHorizontal, to provide some padding on the left side of the tree.
    // This was a carry over from the original implementation but might not be necessary anymore.
    this.xPosition = 2 * formatting.tierSpacingHorizontal;
    // Edges map is specific to each built tree, so it is cleared at the start of each parse.
    this.edgesMap.clear();
    while (queue.length > 0) {
      // nodesInTier keeps track of the nodes in the current tier, and is used to calculate the height of the tier.
      const nodesInTier: TreeNode[] = [];
      // yPosition is initialized with an offset of 2 * nodeSpacingVertical, to provide some padding on the top of the tree.
      this.yPosition = 2 * formatting.nodeSpacingVertical;
      // tierCount ensures that each loop iteration processes only nodes in the current tier before moving on to the next tier, allowing for tier separation.
      const tierCount = queue.length;
      // tierEdgesStart and tierEdgesEnd keep track of the edges which start or end in the current tier, as they will need to be offset along with the nodes in the tier.
      const tierEdgesStart: TreeEdge[] = [];
      const tierEdgesEnd: TreeEdge[] = [];
      for (let i = 0; i < tierCount; i++) {
        const node = queue.shift();
        // Recording the type of the node for use with color coding.
        const type = Array.isArray(node) ? "array" : typeof node;
        // Properties are the key-value pairs of the node.
        const properties: NodeProperty[] = [];
        if (node) {
          // Fetch the edge which ends at the current node and update its end coordinates.
          // A reference to the edge is stored in the tier, so that it can be offset along with the node.
          if (this.edgesMap.has(node)) {
            const edge = this.edgesMap.get(node)!;
            edge.x2 = this.xPosition;
            edge.y2 = this.yPosition + formatting.nodePaddingVertical;
            tierEdgesEnd.push(edge);
            this.edgesMap.delete(node);
          }
          // Process the node and add its properties to the properties array.
          Object.entries(node).forEach(([key, value], index) => {
            // handle null values
            if (value === null) {
              properties.push({
                key: key,
                value: "null",
                type: "null",
              });
              // Handle object and arrays
            } else if (typeof value === "object") {
              // Special handling for arrays
              if (Array.isArray(value)) {
                if (value.length === 0) {
                  properties.push({
                    key: key,
                    value: "empty array",
                    type: "emptyArray",
                    array: {
                      data: value,
                      index: 0,
                      length: 0,
                    },
                  });
                } else if (formatting.collapseArrays) {
                  // If collapseArrays is true, we only want to show the currently selected array entry
                  let entry = value[this.getArrayIndex(value)];
                  properties.push(
                    this.processArrayProperty(
                      key,
                      value,
                      entry,
                      queue,
                      tierEdgesStart,
                      formatting,
                      index
                    )
                  );
                } else {
                  // If collapseArrays is false, we want to show all array entries
                  let property: NodeProperty = {} as NodeProperty;
                  value.forEach((entry, arrayIndex) => {
                    property = this.processArrayProperty(
                      key,
                      value,
                      entry,
                      queue,
                      tierEdgesStart,
                      formatting,
                      index
                    );
                  });
                  properties.push({
                    ...property,
                    value: "array",
                    type: "array",
                  });
                }
                // Handling for objects
              } else {
                queue.push(value);
                const edge: TreeEdge = {
                  x1:
                    this.xPosition +
                    formatting.nodeWidth +
                    2 * formatting.nodePaddingHorizontal,
                  y1:
                    this.yPosition +
                    (index + 0.5) *
                      (formatting.textSize + formatting.lineSpacing) +
                    formatting.nodePaddingVertical,
                  x2: 0,
                  y2: 0,
                  type: "object",
                };
                this.edgesMap.set(value, edge);
                tierEdgesStart.push(edge);
                properties.push({
                  key: key,
                  value: "object",
                  type: "object",
                });
              }
              // If property is not an object or array, it is a primitive value and nothing is pushed to the queue.
            } else if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              properties.push({
                key: key,
                value: value,
                type: typeof value,
              });
            }
          });
        }
        // Push the node to the tier and update the yPosition for the next node.
        nodesInTier.push({
          type: type,
          x: this.xPosition,
          y: this.yPosition,
          properties: properties,
        });
        this.yPosition +=
          properties.length * (formatting.textSize + formatting.lineSpacing) +
          2 * formatting.nodePaddingVertical +
          formatting.nodeSpacingVertical;
      }
      // Calculate the height of the tier and update the maxHeight for the tree if necessary.
      const tierHeight =
        nodesInTier
          .map((node) => {
            return (
              node.properties.length *
              (formatting.textSize + formatting.lineSpacing)
            );
          })
          .reduce((sum, num) => sum + num) +
        nodesInTier.length * formatting.nodePaddingVertical * 2 +
        (nodesInTier.length - 1) * formatting.nodeSpacingVertical;
      this.maxHeight = Math.max(this.maxHeight, tierHeight);
      // Push the tier to the tiers array and update the xPosition for the next tier.
      tiers.push({
        height: tierHeight,
        nodes: nodesInTier,
        edgesStart: tierEdgesStart,
        edtesEnd: tierEdgesEnd,
        yOffSet: 0,
      });
      this.xPosition +=
        formatting.nodeWidth +
        formatting.tierSpacingHorizontal +
        2 * formatting.nodePaddingHorizontal;
    }
    // Offset the nodes and edges in each tier so that they are centered vertically.
    for (const tier of tiers) {
      tier.yOffSet = (this.maxHeight - tier.height) * 0.5;
      tier.nodes.forEach((node) => {
        node.y += tier.yOffSet;
      });
      tier.edgesStart.forEach((edge) => {
        edge.y1 += tier.yOffSet;
      });
      tier.edtesEnd.forEach((edge) => {
        edge.y2 += tier.yOffSet;
      });
    }
    // Return the nodes and edges of the tree (only edgesStart are needed, since edgesEnd are duplicate references.)
    return {
      nodes: tiers.flatMap((tier) => tier.nodes),
      edges: tiers.flatMap((tier) => tier.edgesStart),
      height: this.maxHeight,
      width: this.xPosition - formatting.tierSpacingHorizontal,
    };
  }

  // Helper function to process array properties as it may be necessary to process multiple array entries per property.
  processArrayProperty(
    key: string,
    value: Array<any>,
    entry: any,
    queue: Denque<any>,
    tierEdgesStart: TreeEdge[],
    formatting: Formatting,
    index: number
  ): NodeProperty {
    if (entry === null) {
      return {
        key: key,
        value: "null",
        type: "null",
        array: {
          data: value,
          index: this.getArrayIndex(value),
          length: value.length,
        },
      };
    } else if (typeof entry === "object") {
      queue.push(entry);
      const edge: TreeEdge = {
        x1:
          this.xPosition +
          formatting.nodeWidth +
          2 * formatting.nodePaddingHorizontal,
        y1:
          this.yPosition +
          (index + 0.5) * (formatting.textSize + formatting.lineSpacing) +
          formatting.nodePaddingVertical,
        x2: 0,
        y2: 0,
        type: "array",
      };
      this.edgesMap.set(entry, edge);
      tierEdgesStart.push(edge);
      const type = Array.isArray(entry) ? "array" : "object";
      return {
        key: key,
        value: type,
        type: type,
        array: {
          data: value,
          index: this.getArrayIndex(value),
          length: value.length,
        },
      };
    }
    return {
      key: key,
      value: entry,
      type: typeof entry,
      array: {
        data: value,
        index: this.getArrayIndex(value),
        length: value.length,
      },
    };
  }

  // Helper function to get the current selected index of an array if it exists, otherwise set it to 0.
  getArrayIndex(array: Array<any>): number {
    if (this.arrayMap.has(array)) {
      return this.arrayMap.get(array)!;
    } else {
      this.arrayMap.set(array, 0);
      return 0;
    }
  }

  // Helper function to increment the current selected index of an array.
  incrementArrayIndex(array: Array<any>): void {
    if (this.arrayMap.has(array)) {
      const newIndex =
        (((this.arrayMap.get(array)! + 1) % array.length) + array.length) %
        array.length;
      this.arrayMap.set(array, newIndex);
    }
  }

  // Helper function to decrement the current selected index of an array.
  decrementArrayIndex(array: Array<any>): void {
    if (this.arrayMap.has(array)) {
      const newIndex =
        (((this.arrayMap.get(array)! - 1) % array.length) + array.length) %
        array.length;
      this.arrayMap.set(array, newIndex);
    }
  }
}
