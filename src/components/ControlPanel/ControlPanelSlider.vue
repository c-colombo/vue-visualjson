<script setup lang="ts">
// Control panel slider component. Emits an event to the parent component when the user interacts with the slider.

const props = defineProps<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number | string;
}>();

defineEmits<{
  (event: "update:value", value: number): void;
}>();
</script>

<template>
  <div class="control-panel-slider">
    <h3 class="option-label">
      {{ `${props.label}: ` }}
    </h3>
    <input
      class="slider"
      type="range"
      :min="props.min"
      :max="props.max"
      :value="props.value"
      :step="props.step"
      @input="
        $emit('update:value', Number(($event.target as HTMLInputElement).value))
      "
    />
  </div>
</template>
