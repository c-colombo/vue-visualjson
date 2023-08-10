<script setup lang="ts">
import type { Formatting, NodeProperty } from "../../lib/types";
import { computed } from "vue";

// Node property component. Renders a property and its value.
// Also renders type labels if enabled in the formatting options.

const props = defineProps<{ property: NodeProperty; formatting: Formatting }>();

const propertyValue = computed(() => {
  switch (props.property.type) {
    case "string":
      return `"${props.property.value}"`;
    case "object":
      return `(${props.property.value})`;
    default:
      return props.property.value;
  }
});
</script>

<template>
  <div class="property">
    <h3 class="key">{{ property.key }}</h3>
    <h3
      v-if="props.formatting.typeLabels"
      :class="{ type: true, [property.type]: true }"
    >
      {{ "<" + property.type + ">" }}
    </h3>
    <h3 v-if="property.array" class="arrayCount">
      {{ property.array.length }}
    </h3>
    <h3 class="key">{{ ":" }}</h3>
    <h3 :class="{ value: true, [property.type]: true }">
      {{ propertyValue }}
    </h3>
  </div>
</template>
