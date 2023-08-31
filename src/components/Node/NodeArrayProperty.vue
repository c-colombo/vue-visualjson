<script setup lang="ts">
import type { NodeProperty, Formatting } from "../../lib/types";
import { PhPlus, PhMinus } from "@phosphor-icons/vue";
import { toRaw } from "vue";

// Node array property component. Renders an array property and its entries.
// Also renders type labels if enabled in the formatting options.
// Renders differently depending on whether the array is collapsed or not.
// Passthrough of array index increment and decrement events from child components.

const props = defineProps<{ property: NodeProperty; formatting: Formatting }>();
defineEmits<{
  (event: "incrementIndex", array: Array<any>): void;
  (event: "decrementIndex", array: Array<any>): void;
}>();

// Inspects the type of an entry with more detail than typeof. Used when rendering an expanded array.
function getEntryType(entry: any) {
  switch (typeof entry) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      if (entry === null) {
        return "null";
      } else if (Array.isArray(entry)) {
        return "array";
      } else {
        return "object";
      }
    default:
      return "null";
  }
}

// Applies syntactical formatting to an entry depending on its type.
function getEntryValue(entry: any, type?: string) {
  type = type ? type : getEntryType(entry);
  switch (type) {
    case "object":
      return `(${type})`;
    case "array":
      return `(${type})`;
    case "emptyArray":
      return `(${entry})`;
    case "null":
      return type;
    case "string":
      return `"${entry}"`;
    default:
      return entry;
  }
}
</script>

<template>
  <div v-if="property.array && formatting.collapseArrays" class="property">
    <h3 class="key">
      {{ property.key }}
    </h3>
    <h3
      v-if="props.formatting.typeLabels"
      :class="{ type: true, array: true }"
    >
      {{ "<array>" }}
    </h3>
    <h3 class="arrayCount">
      {{ `(${property.array.length})` }}
    </h3>
    <button
      class="arrayButton"
      @click="$emit('incrementIndex', toRaw(property.array.data))"
    >
      <PhPlus
        class="icons"
        :size="props.formatting.textSize + 'rem'"
        color="#d0d0d0"
        weight="bold"
      />
    </button>
    <button
      class="arrayButton"
      @click="$emit('decrementIndex', toRaw(property.array.data))"
    >
      <PhMinus
        class="icons"
        :size="props.formatting.textSize + 'rem'"
        color="#d0d0d0"
        weight="bold"
      />
    </button>
    <h3 class="key">{{ `${property.array.index}:` }}</h3>
    <h3 :class="{ value: true, [property.type]: true }">
      {{ getEntryValue(property.value, property.type) }}
    </h3>
  </div>
  <div v-else-if="property.array" class="property">
    <h3 class="key">
      {{ property.key }}
    </h3>
    <h3
      v-if="props.formatting.typeLabels"
      :class="{ type: true, [property.type]: true }"
    >
      {{ "<array>" }}
    </h3>
    <h3 class="key">{{ ":" }}</h3>
    <h3 class="value arraySyntax">
      <span class="arraySyntax">[</span>
      <span v-for="(entry, index) of property.array.data">
        <span class="arraySyntax">{{ index === 0 ? "" : ", " }}</span>
        <span :class="{ value: true, [getEntryType(entry)]: true }">
          {{ getEntryValue(entry) }}
        </span>
      </span>
      <span class="arraySyntax">]</span>
    </h3>
  </div>
</template>
