<script setup>
import { pointList } from '/public/data/pois.js'
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
import Track from './Track.vue'
const store = useGlobalState()
const loadScene = ref(false)
onMounted(() => {
    document.getElementsByTagName('a-scene')[0].addEventListener('loaded', () => {
        loadScene.value = true
    })


})

// watch(store.centerPoi.value, (oldval, newval) => {
// })

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
        <a-entity v-for="(item, index) in pointList.results" :key="item.place_id"
            :line="`start: ${getLinePoi(index).start}; end: ${getLinePoi(index).end}; color: red;`">
        </a-entity>
    </a-entity> -->

    <!-- 底部路线箭头 -->
    <a-entity v-if="loadScene">
        <Track v-for="(item, index) in pointList.results" :key="item.place_id"
            :start-poi="getLinePoi(index).point_poi_start" :end-poi="getLinePoi(index).point_poi_end"
            :lookAt="`#point_${index}`">
        </Track>
    </a-entity>

    <!-- 拐弯点 -->
    <a-entity v-for="(item, index) in pointList.results" ref="placeRef" :key="item.place_id" :id="`point_${index}`"
        :gps-projected-entity-place="`latitude: ${item.geometry.location.lat}; longitude: ${item.geometry.location.lng};`">
        <a-image src="#place_img" look-at="[gps-camera]" scale="1 1 1"></a-image>
    </a-entity>
</template>