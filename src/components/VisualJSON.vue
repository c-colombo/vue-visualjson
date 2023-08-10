<script setup lang="ts">
import type { Formatting } from "../lib/types";
import { onMounted, ref, watch, nextTick } from "vue";
import {
  PhDotsThreeVertical,
  PhCrosshair,
  PhWarning,
} from "@phosphor-icons/vue";
import Tree from "./Tree/Tree.vue";
import ControlPanel from "./ControlPanel/ControlPanel.vue";

// Main component. Renders the viewport, tree, and control panel.

const props = defineProps({
  json: {
    type: String,
    required: true,
  },
  // defaultFormatting is optional and allows the consumer to specify a set of formatting options to be applied on load.
  defaultFormatting: {
    type: Object,
    required: false,
  },
});

// Error handling for if the provided string is not valid JSON.
const validJSON = ref<boolean>(true);

// This keeps track of the current scale and translation of the content element to allow for panning and zooming.
// It also transforms the viewport background scale to give the illusion that it is infinite and zooms with the content.
const contentScale = ref({
  scale: 1,
  minScale: 0.5,
  maxScale: 1.5,
  translateX: 0,
  translateY: 0,
  panning: {
    active: false,
    mouseX: 0,
    mouseY: 0,
  },
});

// The viewport offset is tracked separately from the content translation, as the content offset is altered as formatting options are changed to keep the relative position of the tree fixed in the viewport.
// This does however update the background patten offset with the content translation when the viewport is panned to give the illusion that the background is also panning.
const viewportScale = ref({
  translateX: 0,
  translateY: 0,
});

const viewport = ref<HTMLElement>();
const content = ref<HTMLElement>();

// Default formatting options.
const formatting = ref<Formatting>({
  collapseArrays: true,
  colorcodeEdges: false,
  colorcodeNodes: false,
  typeLabels: false,
  textSize: 0.75,
  lineSpacing: 0.25,
  nodePaddingVertical: 0.5,
  nodePaddingHorizontal: 0.5,
  nodeWidth: 24,
  nodeSpacingVertical: 4,
  tierSpacingHorizontal: 6,
});

const contentWidth = ref<number>(0);
const contentHeight = ref<number>(0);

const configOpen = ref<boolean>(false);

// Watch for changes to the JSON prop. Update the tree and reset the viewport only after the next tick to allow the DOM to update.
watch(
  () => props.json,
  () => {
    validateJSON();
    nextTick(() => {
      resetViewport();
    });
  }
);

function resetContentScale() {
  contentScale.value = {
    scale: 1,
    minScale: 0.5,
    maxScale: 1.5,
    translateX: 0,
    translateY: 0,
    panning: {
      active: false,
      mouseX: 0,
      mouseY: 0,
    },
  };
}

function resetViewport() {
  resetContentScale();
  if (viewport.value) {
    contentScale.value.translateY =
      (viewport.value.clientHeight - contentHeight.value * 16) / 2;
    viewportScale.value.translateY = contentScale.value.translateY;
    contentScale.value.translateX = 0;
    viewportScale.value.translateX = contentScale.value.translateX;
  }
}

// Update the content offset when the tree is built.
// This preserves the relative position of the tree in the viewport when formatting options are changed.
function handleTreeBuild(height: number, width: number) {
  const deltaY = height - contentHeight.value;
  // const deltaX = width - contentWidth.value;
  contentHeight.value = height;
  contentWidth.value = width;
  contentScale.value.translateY -= deltaY * 8 * contentScale.value.scale;
  // contentScale.value.translateX -= deltaX * 8 * contentScale.value.scale;
}

// Scaling content correct and in accordance with the mouse position in the viewport when scroll wheel is used.
function scaleContent(event: WheelEvent) {
  const oldScale = contentScale.value.scale;
  if (event.deltaY && viewport.value && content.value) {
    const direction = -1 * Math.sign(event.deltaY);
    const zoomScale = 0.1;
    const rect = content.value.getClientRects();
    const deltaX = (event.clientX - rect[0].left) / oldScale;
    const deltaY = (event.clientY - rect[0].top) / oldScale;
    const newScale = contentScale.value.scale + direction * zoomScale;
    if (
      newScale < contentScale.value.maxScale &&
      newScale > contentScale.value.minScale
    ) {
      contentScale.value.scale = newScale;
      const xChange =
        -deltaX * direction * zoomScale +
        content.value.offsetWidth * direction * zoomScale * 0.5;
      const yChange =
        -deltaY * direction * zoomScale +
        content.value.offsetHeight * direction * zoomScale * 0.5;
      contentScale.value.translateX += xChange;
      viewportScale.value.translateX += xChange;
      contentScale.value.translateY += yChange;
      viewportScale.value.translateY += yChange;
    }
  }
}

// Log the mouse position in the viewport on mouse down and begin panning.
function beginPan(event: MouseEvent) {
  contentScale.value.panning = {
    active: true,
    mouseX: event.clientX,
    mouseY: event.clientY,
  };
}

// Stop panning on mouse up.
function endPan(event: MouseEvent) {
  contentScale.value.panning = {
    active: false,
    mouseX: 0,
    mouseY: 0,
  };
}

// Pan the content when the mouse is moved while panning is active.
function pan(event: MouseEvent) {
  if (contentScale.value.panning.active) {
    const xChange = event.clientX - contentScale.value.panning.mouseX;
    const yChange = event.clientY - contentScale.value.panning.mouseY;
    contentScale.value.translateX += xChange;
    viewportScale.value.translateX += xChange;
    contentScale.value.translateY += yChange;
    viewportScale.value.translateY += yChange;
    contentScale.value.panning.mouseX = event.clientX;
    contentScale.value.panning.mouseY = event.clientY;
  }
}

// Validate the JSON prop.
function validateJSON() {
  try {
    JSON.parse(props.json);
    validJSON.value = true;
  } catch (error) {
    validJSON.value = false;
  }
}

// Apply default formatting options.
function applyDefaultFormatting() {
  if (props.defaultFormatting) {
    formatting.value = {
      ...formatting.value,
      ...props.defaultFormatting,
    };
  }
}

onMounted(() => {
  validateJSON();
  applyDefaultFormatting();
  resetViewport();
  // console.log("mounted");
});
</script>

<template>
  <div
    class="visualjson visualjson-viewport"
    ref="viewport"
    :style="{
      backgroundSize: `${24 * contentScale.scale}px ${
        24 * contentScale.scale
      }px`,
      backgroundPosition: `${viewportScale.translateX}px ${viewportScale.translateY}px`,
    }"
    @wheel="scaleContent"
    @mousedown="beginPan"
    @mouseup="endPan"
    @mouseleave="endPan"
    @mousemove="pan"
  >
    <div class="settings" @mousedown="$event.stopPropagation()">
      <div class="button-row">
        <button class="button">
          <PhCrosshair
            size="1.5rem"
            color="#d0d0d0"
            weight="regular"
            @click="resetViewport"
          />
        </button>
        <button
          class="button"
          :style="[configOpen ? { backgroundColor: '#808080' } : {}]"
        >
          <PhDotsThreeVertical
            size="1.5rem"
            color="#d0d0d0"
            weight="bold"
            @click="
              {
                configOpen = !configOpen;
              }
            "
          />
        </button>
      </div>
      <ControlPanel
        v-if="configOpen"
        :formatting="formatting"
        @update:collapse-arrays="
          formatting.collapseArrays = !formatting.collapseArrays
        "
        @update:colorcode-edges="
          formatting.colorcodeEdges = !formatting.colorcodeEdges
        "
        @update:colorcode-nodes="
          formatting.colorcodeNodes = !formatting.colorcodeNodes
        "
        @update:type-labels="formatting.typeLabels = !formatting.typeLabels"
        @update:line-spacing="formatting.lineSpacing = $event"
        @update:text-size="formatting.textSize = $event"
        @update:node-width="formatting.nodeWidth = $event"
        @update:node-spacing-vertical="formatting.nodeSpacingVertical = $event"
        @update:tier-spacing-horizontal="
          formatting.tierSpacingHorizontal = $event
        "
      />
    </div>

    <div
      v-if="validJSON"
      class="content"
      ref="content"
      :style="{
        transform: `translate(${contentScale.translateX}px,${contentScale.translateY}px) scale(${contentScale.scale})`,
      }"
      @click="configOpen = false"
    >
      <Tree
        :data="props.json"
        :formatting="formatting"
        @tree-built="handleTreeBuild($event.height, $event.width)"
        @catch-error="configOpen = true"
      ></Tree>
    </div>
    <div
      v-else
      class="error"
      :style="{ marginTop: viewport ? `${viewport.clientHeight / 4}px` : 0 }"
    >
      <PhWarning :size="viewport ? `${viewport.clientHeight / 4}` : 0" />
      <h1>Invalid JSON</h1>
    </div>
  </div>
</template>
