// store.js
import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useGlobalState = createGlobalState(() => {
  // state
  const directions = ref();
  const centerPoi = ref({ lat: 0, lng: 0 });

  // actions
  function setDir(value) {
    directions.value = value;
  }
  function setCenterPoi(value) {
    centerPoi.value = value;
  }

  return { directions, setDir, centerPoi, setCenterPoi };
});
