<script setup lang="ts">
import type { TreeNode, Formatting } from "../../lib/types";
import { toRaw } from "vue";
import NodeProperty from "./NodeProperty.vue";
import NodeArrayProperty from "./NodeArrayProperty.vue";

// Node component. Renders a node and its properties.
// V-binds ensure the node is rendered with the correct formatting and position.
// Passthrough of array index increment and decrement events from child components.

const props = defineProps<{ nodeData: TreeNode; formatting: Formatting }>();
defineEmits<{
  (event: "incrementIndex", array: Array<any>): void;
  (event: "decrementIndex", array: Array<any>): void;
}>();
</script>

<template>
  <div
    :class="{
      node: true,
      'node-object':
        props.nodeData.type === 'object' && props.formatting.colorcodeNodes,
      'node-array':
        props.nodeData.type === 'array' && props.formatting.colorcodeNodes,
    }"
    :style="{
      width: props.formatting.nodeWidth + 'rem',
      height:
        props.nodeData.properties.length *
          (props.formatting.textSize + props.formatting.lineSpacing) +
        'rem',
      paddingTop: props.formatting.nodePaddingVertical + 'rem',
      paddingBottom: props.formatting.nodePaddingVertical + 'rem',
      paddingLeft: props.formatting.nodePaddingHorizontal + 'rem',
      paddingRight: props.formatting.nodePaddingHorizontal + 'rem',
      top: props.nodeData.y + 'rem',
      left: props.nodeData.x + 'rem',
      fontSize: props.formatting.textSize + 'rem',
      lineHeight:
        props.formatting.textSize + props.formatting.lineSpacing + 'rem',
    }"
  >
    <div v-for="(property, index) in nodeData.properties" :key="index">
      <div v-if="property.array">
        <NodeArrayProperty
          :property="property"
          :formatting="props.formatting"
          @increment-index="$emit('incrementIndex', toRaw(property.array.data))"
          @decrement-index="$emit('decrementIndex', toRaw(property.array.data))"
        />
      </div>
      <div v-else>
        <NodeProperty :property="property" :formatting="props.formatting" />
      </div>
    </div>
  </div>
</template>
