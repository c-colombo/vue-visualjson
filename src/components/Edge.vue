<script setup lang="ts">
import type { TreeEdge, Formatting } from "../lib/types";
import { computed } from "vue";
import { convertRemToPixels } from "../utils";

// Edge component. Renders an edge between two nodes.
// The edge is rendered as a cubic bezier curve, with the control points calculated based on the relative positions of the two nodes.
// Edge is rendered with a different color depending on whether it is an object edge or array edge, and whether colorcoding is enabled in the formatting options.

const props = defineProps<{
  edgeData: TreeEdge;
  height: number;
  width: number;
  formatting: Formatting;
}>();

const curvePath = computed(() => {
  const startX = convertRemToPixels(props.edgeData.x1);
  const startY = convertRemToPixels(props.edgeData.y1);
  const lengthX = convertRemToPixels(props.edgeData.x2 - props.edgeData.x1);
  const lengthY = convertRemToPixels(props.edgeData.y2 - props.edgeData.y1);
  return `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
    startX + lengthX / 2
  } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`;
});
</script>

<template>
  <svg
    :class="{
      edge: true,
      'edge-object':
        props.edgeData.type === 'object' && formatting.colorcodeEdges,
      'edge-array':
        props.edgeData.type === 'array' && formatting.colorcodeEdges,
    }"
    :style="{
      height: convertRemToPixels(props.height) + 'px',
      width: convertRemToPixels(props.width) + 'px',
    }"
  >
    <path :d="curvePath" stroke-width="2" fill="none" />
  </svg>
</template>
