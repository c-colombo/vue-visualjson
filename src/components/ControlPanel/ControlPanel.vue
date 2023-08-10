<script setup lang="ts">
import type { Formatting } from "../../lib/types";
import ControlPanelSlider from "./ControlPanelSlider.vue";
import ControlPanelSwitch from "./ControlPanelSwitch.vue";

// Simple component which constructs the control panel UI and emits events to the parent component when the user interacts with the controls.

const props = defineProps<{
  formatting: Formatting;
}>();

defineEmits<{
  (event: "update:collapseArrays"): void;
  (event: "update:colorcodeEdges"): void;
  (event: "update:colorcodeNodes"): void;
  (event: "update:typeLabels"): void;
  (event: "update:lineSpacing", value: number): void;
  (event: "update:textSize", value: number): void;
  (event: "update:nodeWidth", value: number): void;
  (event: "update:nodeSpacingVertical", value: number): void;
  (event: "update:tierSpacingHorizontal", value: number): void;
}>();
</script>

<template>
  <div>
    <div class="control-panel">
      <ControlPanelSwitch
        label="Collapse Arrays"
        :value="props.formatting.collapseArrays"
        @update:value="$emit('update:collapseArrays')"
      />
      <ControlPanelSwitch
        label="Color Code Edges"
        :value="props.formatting.colorcodeEdges"
        @update:value="$emit('update:colorcodeEdges')"
      />
      <ControlPanelSwitch
        label="Color Code Nodes"
        :value="props.formatting.colorcodeNodes"
        @update:value="$emit('update:colorcodeNodes')"
      />
      <ControlPanelSwitch
        label="Type Labels"
        :value="props.formatting.typeLabels"
        @update:value="$emit('update:typeLabels')"
      />
      <hr class="control-panel-divider" />
      <ControlPanelSlider
        label="Text Size"
        :max="1.5"
        :min="0.5"
        :step="0.125"
        v-model:value="props.formatting.textSize"
        @update:value="$emit('update:textSize', $event)"
      />
      <ControlPanelSlider
        label="Line Spacing"
        :max="1"
        :min="0"
        :step="0.25"
        v-model:value="props.formatting.lineSpacing"
        @update:value="$emit('update:lineSpacing', $event)"
      />
      <hr class="control-panel-divider" />
      <ControlPanelSlider
        :label="'Node Width'"
        :max="48"
        :min="24"
        :step="'any'"
        v-model:value="props.formatting.nodeWidth"
        @update:value="$emit('update:nodeWidth', $event)"
      />
      <ControlPanelSlider
        :label="'Vertical Spacing'"
        :max="12"
        :min="0"
        :step="'any'"
        v-model:value="props.formatting.nodeSpacingVertical"
        @update:value="$emit('update:nodeSpacingVertical', $event)"
      />
      <ControlPanelSlider
        :label="'Horizontal Spacing'"
        :max="12"
        :min="0"
        :step="'any'"
        v-model:value="props.formatting.tierSpacingHorizontal"
        @update:value="$emit('update:tierSpacingHorizontal', $event)"
      />
    </div>
  </div>
</template>
