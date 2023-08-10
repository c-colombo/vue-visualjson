<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from "vue";
import Tree from "./tree";
import Node from "../Node/Node.vue";
import Edge from "../Edge.vue";
import type { TreeData, Formatting } from "../../lib/types";

const props = defineProps<{
  data: string;
  formatting: Formatting;
}>();

// treeBuilt event informs parent component of the height and width of the tree so that its relative position in the viewport can be preserved.
const emit = defineEmits<{
  (
    event: "treeBuilt",
    value: {
      height: number;
      width: number;
    }
  ): void;
}>();

const treeData = ref<TreeData>({} as TreeData);
const builder = ref<Tree>({} as Tree);

// Watch for changes in the data prop and rebuild the tree
watch(
  () => props.data,
  (newData) => {
    builder.value.reset(newData);
    buildTree(props.formatting);
  }
);

// Watch for changes in the formatting prop and rebuild the tree
// Some formatting changes require a rebuild of the tree, others do not, but those that do not are likely to be infrequent and in the minority.
watch(
  () => props.formatting,
  (newformatting) => {
    buildTree(newformatting);
  },
  { deep: true }
);

// Handle array index increment and decrement events from child nodes and rebuild the tree
function handleArrayIncrement(array: Array<any>) {
  builder.value.incrementArrayIndex(array);
  buildTree(props.formatting);
}

function handleArrayDecrement(array: Array<any>) {
  builder.value.decrementArrayIndex(array);
  buildTree(props.formatting);
}

function buildTree(formatting: Formatting) {
  treeData.value = builder.value.parseJSON(formatting);
  emit("treeBuilt", {
    height: treeData.value.height + 4 * props.formatting.nodeSpacingVertical,
    width: treeData.value.width + 4 * props.formatting.tierSpacingHorizontal,
  });
}

// Error handling for invalid JSON
onBeforeMount(() => {
  try {
    builder.value = new Tree(props.data);
  } catch (error) {
    builder.value = new Tree("{}");
  }
  buildTree(props.formatting);
});

onMounted(() => {
  // console.log("mounted");
});
</script>

<template>
  <div class="tree">
    <!-- Preventing propagation of mousedown events from nodes to the tree component prevents the tree from being dragged around the viewport when the user clicks and drags on a node. -->
    <Edge
      v-for="(edge, index) of treeData.edges"
      :key="index"
      :edge-data="edge"
      :height="treeData.height + 4 * props.formatting.nodeSpacingVertical"
      :width="treeData.width + 4 * props.formatting.tierSpacingHorizontal"
      :formatting="props.formatting"
    />
    <Node
      v-for="(node, index) of treeData.nodes"
      :key="index"
      :node-data="node"
      :formatting="props.formatting"
      @decrement-index="handleArrayDecrement"
      @increment-index="handleArrayIncrement"
      @mousedown="$event.stopPropagation()"
    />
  </div>
</template>
