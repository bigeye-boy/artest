<script setup>
import { pointList } from '@/assets/js/pois.js'
import { getGreatCircleDistance } from '@/assets/js/util.js'
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
import Track from './Track.vue'

import Leftarrow from './Leftarrow.vue'
import Rightarrow from './Rightarrow.vue'
const store = useGlobalState()
const clickPoint = () => {
    // alert(1)
}
const planeHeight = ref(0)
const planeposition_x = ref(0)
const planeposition_z = ref(0)
const planerotation_z = ref(0)
const planeRepeat = ref(500)
const loadScene = ref(false)
onMounted(() => {
    document.getElementsByTagName('a-scene')[0].addEventListener('loaded', () => {
        loadScene.value = true
        // const poi = document.querySelector('#point_0').getAttribute('gps-projected-entity-place')
        const poi = document.querySelector('#point_0').getAttribute('position')
        planeHeight.value = (Math.sqrt(Math.pow(poi.z, 2) + Math.pow(poi.x, 2)))
        planeRepeat.value = parseInt(planeHeight.value / 1.7)
        planeposition_x.value = poi.x / 2
        planeposition_z.value = poi.z / 2

        planerotation_z.value = Math.atan(poi.x / poi.z) * (180 / Math.PI)
        // planeHeight.value = getGreatCircleDistance(store.centerPoi.value.lat, store.centerPoi.value.lng, poi.latitude, poi.longitude)
    })


})

watch(store.centerPoi.value, (oldval, newval) => {
    planeHeight.value = getGreatCircleDistance(newval.lat, newval.lng, poi.latitude, poi.longitude)
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
    <a-entity v-for="(item, index) in pointList.results" ref="placeRef" :key="item.place_id" @click.prevent="clickPoint"
        :id="`point_${index}`"
        :gps-projected-entity-place="`latitude: ${item.geometry.location.lat}; longitude: ${item.geometry.location.lng};`">
        <!-- <a-image src="#place_img" look-at="[gps-camera]" scale="40 40 40"></a-image> -->
    </a-entity>
</template>