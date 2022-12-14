<script setup>
// import { directions } from '@/assets/js/directions.js'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useGlobalState } from '@/store'
const loadScene = ref(false)
const directions = useGlobalState().directions
const steps = directions.value.routes[0].legs[0].steps
console.log(steps[0].start_location.lat());
onMounted(() => {
    document.getElementsByTagName('a-scene')[0].addEventListener('loaded', () => {
        // setTimeout(() => {
        //     loadScene.value = true
        // }, 2000);
        loadScene.value = true
    })

})

const getLinePoi = computed(() => {
    return (index) => {
        let endid = `#point_${index}`
        console.log(endid);
        let startid = index > 0 ? `#point_${index - 1}` : ''
        let point_poi_end = document.querySelector(endid).getAttribute('position')
        let point_poi_start = { x: 0, y: 0, z: 0 }
        if (startid) {
            point_poi_start = document.querySelector(startid).getAttribute('position')
        }
        return { end: `${point_poi_end.x} 0.5  ${point_poi_end.z}`, start: `${point_poi_start.x} 0.5  ${point_poi_start.z}` }
    }
})
</script>

<template>
    <!-- <a-entity v-if="loadScene">
        <a-entity v-for="(item, index) in steps" :key="item.polyline.points"
            :line="`start: ${getLinePoi(index).start}; end: ${getLinePoi(index).end}; color: red;`">
            <a-image src="#arrow_bottom" :position="getLinePoi(index).start" rotation="0 90 0"
                :animation="`property: position;from: ${getLinePoi(index).start};to: ${getLinePoi(index).end}; dur: 9000; easing: linear; loop: true`"></a-image>
        </a-entity>
    </a-entity>
    <a-entity v-if="loadScene">
        <a-entity v-for="(item, index) in steps" :key="item.polyline.points" :id="`point_${index}`"
            :gps-entity-place="`latitude: ${item.start_location.lat}; longitude: ${item.start_location.lng};`">
            <a-image src="#place_img" look-at="[gps-camera]"></a-image>
        </a-entity>
    </a-entity> -->
    <a-entity v-if="loadScene">
        <a-entity v-for="(item, index) in steps" :key="item.encoded_lat_lngs"
            :line="`start: ${getLinePoi(index).start}; end: ${getLinePoi(index).end}; color: red;`">
            <a-image src="#arrow_bottom" :position="getLinePoi(index).start" rotation="0 90 0"
                :animation="`property: position;from: ${getLinePoi(index).start};to: ${getLinePoi(index).end}; dur: 9000; easing: linear; loop: true`"></a-image>
        </a-entity>
    </a-entity>
    <a-entity>
        <a-entity v-for="(item, index) in steps" :key="item.encoded_lat_lngs" :id="`point_${index}`"
            :gps-entity-place="`latitude: ${item.start_location.lat()}; longitude: ${item.start_location.lng()};`">
            <a-image src="#place_img" look-at="[gps-camera]"></a-image>
        </a-entity>
    </a-entity>
</template>