// store.js
import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useGlobalState = createGlobalState(() => {
  // state
  const directions = ref();
  // const centerPoi = ref({ lat: 0, lng: 0 });
  // 36.631902, 114.326904
  const centerPoi = ref({ lat: 36, lng: 114 });
  // actions
  function setDir(value) {
    directions.value = value;
  }
  function setCenterPoi(value) {
    centerPoi.value = value;
  }

  const popupState = ref({
    show: false,
    type: "1",
    info: {
      img: "/src/assets/image/info.jpg",
      name: "",
      detail: "",
    },
  });

  function setPopupState(value) {
    popupState.value = { ...popupState.value, ...value };
  }

  return {
    directions,
    setDir,
    centerPoi,
    setCenterPoi,
    popupState,
    setPopupState,
  };
});
