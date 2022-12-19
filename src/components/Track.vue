<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
const props = defineProps({
    startPoi: {
        type: Object,
        default() {
            return { x: 0, y: 0, z: 0 }
        }
    },
    endPoi: {
        type: Object,
        default() {
            return { x: 0, y: 0, z: 0 }
        }
    },
    lookAt: String
})
const { endPoi, startPoi } = props
// 纬度0.0001 = 13.76米
const planeHeight = ref(0)

const planeposition_x = ref(0)
const planeposition_z = ref(0)

const planerotation_z = ref(0)

const planeRepeat = ref(500)
const loadScene = ref(false)
const rotation = ref('-90 0 0')
const plane_arrowRef = ref(null)
onMounted(() => {
    loadScene.value = true
    // const poi = document.querySelector('#point_0').getAttribute('gps-projected-entity-place')
    // const poi = document.querySelector('#point_0').getAttribute('position')
    // 两点间长度
    planeHeight.value = Math.sqrt(Math.pow(endPoi.x - startPoi.x, 2) + Math.pow(endPoi.z - startPoi.z, 2))
    console.log('planeHeight.value', planeHeight.value);
    // 图标重复数
    planeRepeat.value = parseInt(planeHeight.value / 1.5)

    // 中点的位置
    planeposition_x.value = (startPoi.x + endPoi.x) / 2
    planeposition_z.value = (startPoi.z + endPoi.z) / 2

    // 旋转的角度
    console.log('startPoi', startPoi);
    // if (startPoi.x == 0 && startPoi.z == 0) {
    //     console.log('开始');
    //     planerotation_z.value = Math.asin((endPoi.x - startPoi.x) / planeHeight.value) * (180 / Math.PI)
    // }
    // else {
    //     planerotation_z.value = (Math.asin((endPoi.z - startPoi.z) / planeHeight.value) * (180 / Math.PI)) + 90
    //     console.log(planerotation_z.value);
    // }



    // planerotation_z.value = Math.atan((endPoi.x - startPoi.x) / (endPoi.z - startPoi.z)) * (180 / Math.PI)
    // planerotation_z.value = Math.acos((endPoi.z - startPoi.z) / planeHeight.value) * (180 / Math.PI)
    // planeHeight.value = getGreatCircleDistance(store.centerPoi.value.lat, store.centerPoi.value.lng, poi.latitude, poi.longitude)
    // setTimeout(() => {
    //     rotation.value = '-90 0 0'
    // }, 1500);
    // setTimeout(() => {
    //     plane_arrowRef.value.setAttribute('rotation', '-90 0 0')
    // }, 2000);

})
</script>

<template>
    <!-- <a-plane class="plane_arrow" ref="plane_arrowRef" color="#CCC" src="#arrow_bottom_down" :repeat="`1 ${planeRepeat}`"
        :height="planeHeight" width="0.8" :rotation="rotation" :look-at="lookAt"
        :position="`${planeposition_x} 0 ${planeposition_z}`"></a-plane> -->
    <a-entity :look-at="lookAt" :position="`${planeposition_x} 0 ${planeposition_z}`">
        <a-plane src="#arrow_bottom_down" :repeat="`1 ${planeRepeat}`" :height="planeHeight" width="0.8"
            rotation="-90 0 0"></a-plane>
    </a-entity>
</template>