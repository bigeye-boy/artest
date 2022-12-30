<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
import couponList from '/public/data/coupon.json'
import { useEventBus } from '@vueuse/core'
const { on } = useEventBus('gps-update')
const store = useGlobalState()
onMounted(() => {
    on((message) => {
        let cameraPosition = message.target.object3D.position;
        placeRefs.value.forEach(item => {
            let markerPosition = item.object3D.position;
            let distance = cameraPosition.distanceTo(markerPosition)
            if (typeof distance == 'number') {
                distance = distance.toFixed(1)
                item.distance = distance
            }
            if (distance <= 5) {
                item.setAttribute("visible", 'true')
            }
            else {
                item.setAttribute("visible", 'false')
            }
        })
    })
})
const placeRefs = ref([])
const setPlaceRef = (el) => {
    placeRefs.value.push(el)
}
const clickPoint = (e, info) => {
    store.setPopupState({
        show: true,
        type: '2',
        info: {
            img: info.imgName,
        }
    })
}
</script>
<template>
    <a-entity position="0 0 0">
        <!-- gps-new-entity-place	 -->
        <!-- gps-projected-entity-place -->
        <a-entity v-for="(item, index) in couponList.data" :ref="setPlaceRef" :key="item.place_id"
            :id="`point_${index}`" look-at="[camera]" :data-info="item" visible="false"
            :gps-new-entity-place="`latitude: ${item.location.lat}; longitude: ${item.location.lng};`"
            @click.stop="clickPoint($event, item)" scale="2 2 2" :position="`0 ${item.height} 0`">
            <a-image position="0 0 0" :src="`${item.imgNameThum}`" look-at="[camera]" scale="1 1 1" width="0.5"
                height="0.5"></a-image>
        </a-entity>
    </a-entity>
</template>