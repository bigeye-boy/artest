
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
    // 两点间长度
    planeHeight.value = Math.sqrt(Math.pow(endPoi.x - startPoi.x, 2) + Math.pow(endPoi.z - startPoi.z, 2))
    console.log('planeHeight.value', planeHeight.value);
    // 图标重复数
    planeRepeat.value = parseInt(planeHeight.value / 1.5)

    // 中点的位置
    planeposition_x.value = (startPoi.x + endPoi.x) / 2
    planeposition_z.value = (startPoi.z + endPoi.z) / 2

})
</script>

<template>
    <!-- <a-plane class="plane_arrow" ref="plane_arrowRef" color="#CCC" src="#arrow_bottom_down" :repeat="`1 ${planeRepeat}`"
        :height="planeHeight" width="0.8" :rotation="rotation" :look-at="lookAt"
        :position="`${planeposition_x} 0 ${planeposition_z}`"></a-plane> -->
    <a-entity :look-at="lookAt" :position="`${planeposition_x} 0 ${planeposition_z}`">
        <a-plane src="#arrows" :repeat="`1 ${planeRepeat}`" :height="planeHeight" width="0.8" rotation="0 0 0">
            <!-- <a-image src="#arrow_bottom_up" :position="getLinePoi(index).start" rotation="0 90 0"
                :animation="`property: position;from: ${getLinePoi(index).start};to: ${getLinePoi(index).end}; dur: 9000; easing: linear; loop: true`"></a-image> -->
        </a-plane>
    </a-entity>
</template>