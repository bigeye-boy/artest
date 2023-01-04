<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
import couponList from '/public/data/coupon.json'
import { useEventBus } from '@vueuse/core'
import { useRoute } from 'vue-router'
const { on } = useEventBus('gps-update')
const store = useGlobalState()
let listData = ref(couponList.data)
const tokenIds = useRoute().query.tokenIds
if (tokenIds) {
    const tokenIdsArr = tokenIds.split(',')
    let temp = []
    temp = listData.value.filter(item => {
        return tokenIdsArr.indexOf(item.id) < 0
    })
    listData.value = temp
}
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
            item.clicked = item.clicked || false
            if (distance <= 10) {
                item.setAttribute("visible", 'true')
                if (!item.clicked && store.nearbyPoints.value.indexOf(item.id) < 0) {
                    store.addNearbyPoints(item.id)
                }
            }
            else {
                item.setAttribute("visible", 'false')
                if (!item.clicked) {
                    store.delNearbyPoints(item.id)
                }
            }
        })
    })
})
const placeRefs = ref([])
const setPlaceRef = (el) => {
    placeRefs.value.push(el)
}
const clickPoint = (e, info) => {
    e.target.parentEl.clicked = true
    store.setPopupState({
        show: true,
        type: '2',
        info: {
            img: info.imgName,
        },
        confirm: function () {
            wx && wx.miniProgram.postMessage({
                data: {
                    tokenId: info.id
                }
            })
        }
    })
    store.setMessageState({
        show: false
    })
}
</script>
<template>
    <a-entity position="0 0 0">
        <!-- gps-new-entity-place	 -->
        <!-- gps-projected-entity-place -->
        <a-entity v-for="(item, index) in listData" :ref="setPlaceRef" :key="item.place_id" :id="`coupon_${index}`"
            look-at="[camera]" :data-info="item" visible="false"
            :gps-new-entity-place="`latitude: ${item.location.lat}; longitude: ${item.location.lng};`"
            @click.stop="clickPoint($event, item)" scale="2 2 2" :position="`0 ${item.height} 0`">
            <a-image position="0 0 0" :src="`${item.imgNameThum}`" look-at="[camera]" scale="1 1 1" width="0.5"
                height="0.5"></a-image>
        </a-entity>
    </a-entity>
</template>