<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
import pointList from '/public/data/poi.json'
import { useEventBus } from '@vueuse/core'
const { on } = useEventBus('gps-update')
const store = useGlobalState()
const modalRef = ref(null)
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
            item.querySelector('.distanceText').setAttribute("value", distance + 'M')
            if (distance <= 5) {
                item.querySelector('.bgCircle').setAttribute("color", '#F4B282')
                item.querySelector('.dirCircle').setAttribute("color", '#F4B282')
            }
            else {
                item.querySelector('.bgCircle').setAttribute("color", '#fff')
                item.querySelector('.dirCircle').setAttribute("color", '#fff')
            }
        })
    })
})
const placeRefs = ref([])
const setPlaceRef = (el) => {
    placeRefs.value.push(el)
}
const clickPoint = (e, info) => {
    if (e.target.parentEl.distance > 5) {
        return
    }
    store.setPopupState({
        show: true,
        type: '1',
        info: {
            img: info.placeImg,
            name: info.name,
            detail: info.types[0],
        }
    })
    // const tPosition = e.target.object3D.position
    // console.log(e.target);
    // modalRef.value.setAttribute('position', { x: tPosition.x, y: tPosition.y + 0.5, z: tPosition.z });
    // modalRef.value.setAttribute('visible', 'true');
}
</script>
<template>
    <a-entity position="0 0 0">
        <!-- gps-new-entity-place	 -->
        <!-- gps-projected-entity-place -->
        <a-entity v-for="(item, index) in pointList.data" :ref="setPlaceRef" :key="item.place_id" :id="`point_${index}`"
            look-at="[camera]" :data-info="item"
            :gps-new-entity-place="`latitude: ${item.geometry.location.lat}; longitude: ${item.geometry.location.lng};`"
            @click.stop="clickPoint($event, item)" scale="2 2 2" :position="`0 ${item.height} 0`">
            <a-circle class="bgCircle" position=" 0 0 0.002" color="#fff" opacity="0.52" radius="0.3"></a-circle>
            <a-circle class="dirCircle" position=" 0 0 0.003" color="#fff" radius="0.21"></a-circle>
            <a-image position=" 0 0 0.004" :src="`${item.placeIcon}`" look-at="[camera]" scale="1 1 1" width="0.2"
                height="0.2"></a-image>
            <a-text :value="item.name" align="center" position="0 -0.5 0"></a-text>
            <a-text class="distanceText" value="" position="0 -0.8 0" align="center"></a-text>
        </a-entity>
    </a-entity>



    <!-- <a-entity ref="modalRef" position="0 0 0" look-at="[camera]" htmlembed visible="false">
        <div class="bg-white px-4 py-3 rounded-md space-y-4">
            <div class="flex space-x-4">
                <img src="/src/assets/image/info.jpg" class="w-10 h-10 rounded-full" alt="">
                <div>
                    <div>NEOM Clinic</div>
                    <div>Health</div>
                </div>
            </div>
            <div class="px-2 py-1 text-center bg-white border hover:bg-gray-300" @click="clickImg2">See
                Detail
            </div>
        </div>
    </a-entity> -->





</template>