<script setup lang="ts">
// Control panel switch component. Emits an event to the parent component when the user interacts with the switch.

const props = defineProps<{
  label: string;
  value: boolean;
}>();

defineEmits<{
  (event: "update:value"): void;
}>();
</script>

<template>
  <div class="control-panel-switch">
    <h3 class="option-label">
      {{ `${props.label}: ` }}
    </h3>
    <input
      class="checkbox"
      type="checkbox"
      :checked="value"
      @change="$emit('update:value')"
    />
  </div>
</template>
