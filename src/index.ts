import type { App } from "vue";
import VisualJSON from "./components/VisualJSON.vue";
import "./assets/style.css";

export default {
  install: (Vue: App) => {
    Vue.component("VisualJSON", VisualJSON);
  },
};

export type { Formatting } from "./lib/types";
