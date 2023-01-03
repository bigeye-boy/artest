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
    confirm: () => {
      console.log("confirm");
    },
  });

  function setPopupState(value) {
    popupState.value = { ...popupState.value, ...value };
  }

  const messageState = ref({
    show: false,
    content:
      "You’re getting close to a highlight, tap on the icon to access content.",
  });
  function setMessageState(value) {
    messageState.value = { ...messageState.value, ...value };
  }

  const nearbyPoints = ref([]);
  // const hasClickPoints = [];
  function addNearbyPoints(value) {
    nearbyPoints.value.push(value);
  }
  function delNearbyPoints(value) {
    nearbyPoints.value = nearbyPoints.value.filter((item) => item != value);
  }
  return {
    directions,
    setDir,
    centerPoi,
    setCenterPoi,
    popupState,
    setPopupState,
    messageState,
    setMessageState,
    nearbyPoints,
    addNearbyPoints,
    delNearbyPoints,
  };
});
