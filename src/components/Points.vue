<script setup>
import { pointList } from '@/assets/js/pois.js'
import { computed, nextTick, onMounted, ref } from 'vue';
import Bottomarrow from './Bottomarrow.vue'
const clickPoint = () => {
    // alert(1)
}
const loadScene = ref(false)
onMounted(() => {
    document.getElementsByTagName('a-scene')[0].addEventListener('loaded', () => {
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
    <a-entity v-if="loadScene">
        <a-entity v-for="(item, index) in pointList.results" :key="item.place_id"
            :line="`start: ${getLinePoi(index).start}; end: ${getLinePoi(index).end}; color: red;`">
            <a-image src="#arrow_bottom" :position="getLinePoi(index).start" rotation="0 90 0"
                :animation="`property: position;from: ${getLinePoi(index).start};to: ${getLinePoi(index).end}; dur: 9000; easing: linear; loop: true`"></a-image>
        </a-entity>
    </a-entity>

    <a-entity v-for="(item, index) in pointList.results" ref="placeRef" :key="item.place_id" @click.prevent="clickPoint"
        :id="`point_${index}`"
        :gps-entity-place="`latitude: ${item.geometry.location.lat}; longitude: ${item.geometry.location.lng};`">
        <!-- <img src="#place_img" alt=""> -->
        <a-image src="#place_img" look-at="[gps-camera]" scale="40 40 40"></a-image>


        <!-- <a-entity :line="`start: 0 1 -2; end: ${end}; color: red;width:0.5`"></a-entity> -->
        <!--  -->
        <!-- <a-plane width="6" height="4" color="#586266" opacity="0.6"></a-plane> -->
        <!-- <a-entity line="start: 0 1 0; end: 2 0 -5; color: red"></a-entity> -->
        <!-- <a-entity :line="`start: 0 1 -2; end: ${end}; color: red;width:0.5`"></a-entity> -->
        <!-- <Bottomarrow v-if="index == 0" scale="1 1 1" position="0 -200 0" lookAt="[gps-camera]"></Bottomarrow> -->
        <!-- <Bottomarrow v-else scale="1 1 1" position="0 -200 0" :lookAt="`#point_${index - 1}`"></Bottomarrow> -->

    </a-entity>
</template>