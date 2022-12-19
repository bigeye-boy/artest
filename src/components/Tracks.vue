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
const planeHeight = ref(0)

const planeposition_x = ref(0)
const planeposition_z = ref(0)

const planerotation_z = ref(0)

const planeRepeat = ref(500)
const loadScene = ref(false)

onMounted(() => {
    loadScene.value = true
    // const poi = document.querySelector('#point_0').getAttribute('gps-projected-entity-place')
    // const poi = document.querySelector('#point_0').getAttribute('position')
    // 两点间长度
    planeHeight.value = Math.sqrt(Math.pow(endPoi.x - startPoi.x, 2) + Math.pow(endPoi.z - startPoi.z, 2))
    console.log('planeHeight.value', planeHeight.value);
    // 图标重复数
    planeRepeat.value = parseInt(planeHeight.value / 1.7)

    // 中点的位置
    planeposition_x.value = (startPoi.x + endPoi.x) / 2
    planeposition_z.value = (startPoi.z + endPoi.z) / 2
    // planeposition_x.value = (endPoi.x) / 2
    // planeposition_z.value = (endPoi.z) / 2

    // planerotation_z.value = Math.asin((endPoi.x - startPoi.x) / planeHeight.value) * (180 / Math.PI) - 90
    // planeHeight.value = getGreatCircleDistance(store.centerPoi.value.lat, store.centerPoi.value.lng, poi.latitude, poi.longitude)


})
</script>

<template>
    <a-plane color="#CCC" src="#arrow_bottom_up" :repeat="`1 ${planeRepeat}`" :height="planeHeight" width="0.8"
        :rotation="`-90  0 0`" :position="`${planeposition_x} 0 ${planeposition_z}`"></a-plane>
</template>