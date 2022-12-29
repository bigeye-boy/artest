<script setup>
// import { directions } from '@/assets/js/directions.js'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useGlobalState } from '@/store'
import Track from './Track.vue'
const loadScene = ref(false)
const directions = useGlobalState().directions
console.log(directions);
const steps = directions.value.routes[0].legs[0].steps
console.log(steps[0].start_location.lat);
onMounted(() => {
    document.getElementsByTagName('a-scene')[0].addEventListener('loaded', () => {
        loadScene.value = true
    })

})

const getLinePoi = computed(() => {
    return (index) => {
        let endid = `#point_${index}`
        let startid = index > 0 ? `#point_${index - 1}` : ''
        let point_poi_end = document.querySelector(endid).getAttribute('position')
        let point_poi_start = { x: 0, y: 0, z: 0 }
        if (startid) {
            point_poi_start = document.querySelector(startid).getAttribute('position')
        }
        return { point_poi_start, point_poi_end, end: `${point_poi_end.x} 0.5  ${point_poi_end.z}`, start: `${point_poi_start.x} 0.5  ${point_poi_start.z}` }
    }
})
</script>

<template>
    <!-- 路线辅助线 -->
    <!-- <a-entity v-if="loadScene">
        <a-entity v-for="(item, index) in steps" :key="item.encoded_lat_lngs"
            :line="`start: ${getLinePoi(index).start}; end: ${getLinePoi(index).end}; color: red;`">
            <a-image src="#arrow_bottom_up" :position="getLinePoi(index).start" rotation="0 90 0"
                :animation="`property: position;from: ${getLinePoi(index).start};to: ${getLinePoi(index).end}; dur: 9000; easing: linear; loop: true`"></a-image>
        </a-entity>
    </a-entity> -->

    <!-- 路线箭头 -->
    <a-entity v-if="loadScene">
        <!-- <Track v-for="(item, index) in steps" :key="item.encoded_lat_lngs"
            :start-poi="getLinePoi(index).point_poi_start" :end-poi="getLinePoi(index).point_poi_end"
            :lookAt="`#point_${index}`">
        </Track> -->
        <Track v-for="(item, index) in steps" :key="index" :start-poi="getLinePoi(index).point_poi_start"
            :end-poi="getLinePoi(index).point_poi_end" :lookAt="`#point_${index}`">
        </Track>
    </a-entity>
    <!-- 拐弯点 -->
    <a-entity>
        <!-- <a-entity :id="`point_${index}`"
            :gps-projected-entity-place="`latitude: ${item.start_location.lat()}; longitude: ${item.start_location.lng()};`">
        </a-entity> -->
        <a-entity v-for="(item, index) in steps" :key="index" :id="`point_${index}`"
            :gps-projected-entity-place="`latitude: ${item.end_location.lat()}; longitude: ${item.end_location.lng()};`">
        </a-entity>
        <!-- <a-entity v-for="(item, index) in steps" :key="index" :id="`point_${index}`"
            :gps-projected-entity-place="`latitude: ${item.end_location.lat}; longitude: ${item.end_location.lng};`">
        </a-entity> -->
    </a-entity>
</template>