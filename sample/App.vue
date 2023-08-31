<script setup lang="ts">
import complexJson from "../cypress/fixtures/mocks/complex-json.json";
import veryComplexJson from "../cypress/fixtures/mocks/very-complex-json.json";
import broadJson from "../cypress/fixtures/mocks/broad-json.json";
import twoDimensionalArrayJson from "../cypress/fixtures/mocks/two-dimensional-array-json.json";
import multiDimensionalArrayJson from "../cypress/fixtures/mocks/multi-dimensional-array-json.json";
import mixedArrayJson from "../cypress/fixtures/mocks/mixed-array-json.json";
import emptyArrayJson from "../cypress/fixtures/mocks/empty-array-json.json";
import VisualJSON from "../src/components/VisualJSON.vue";
import "./assets/main.css";
import "../src/assets/style.css";

import { ref, computed } from "vue";

const testData = [
  complexJson,
  veryComplexJson,
  broadJson,
  twoDimensionalArrayJson,
  multiDimensionalArrayJson,
  mixedArrayJson,
  emptyArrayJson,
  undefined,
];
const index = ref(0);
const testJSON = computed(() => JSON.stringify(testData[index.value]));

function incrementIndex() {
  index.value =
    (((index.value + 1) % testData.length) + testData.length) % testData.length;
}

function decrementIndex() {
  index.value =
    (((index.value - 1) % testData.length) + testData.length) % testData.length;
}
</script>

<template>
  <div class="sample-page">
    <VisualJSON
      :json="testJSON"
      :style="{ height: '720px', width: '1280px' }"
    />
    <h3 class="heading">Sample JSON:</h3>
    <div class="sample-controls">
      <button @click="decrementIndex">Prev</button>
      <button @click="incrementIndex">Next</button>
    </div>
  </div>
</template>

<style scoped>
.sample-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heading {
  margin-top: 2rem;
}
.sample-controls {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
}
</style>
