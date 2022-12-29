<!-- minDistance: 小于当前位置【N】米的点不会显示 -->
<!-- maxDistance: 大于当前位置【N】米的点不会显示 -->
<!-- look-controls-enabled="false"
arjs-look-controls="smoothingFactor: 0.1" 减少摇动效果 -->
<script setup>
import { onMounted, ref, watch } from 'vue';

// const props = defineProps({
//     center: Array
// })
// 公司： 39.937439，116.410759
const lat = ref(36);
const lng = ref(114)
onMounted(() => {
    // document.querySelector('#cameraRef').addEventListener('gps-camera-update-position', (payload) => {

    //     console.log(payload.detail);
    // });
})
// watch(lat, (oldval, newval) => {
//     document.querySelector('#cameraRef').setAttribute('gps-projected-camera', {
//         simulateLatitude: newval
//     })
//     console.log(document.querySelector('#cameraRef').getAttribute('gps-projected-camera'));
// })
// watch(lng, (oldval, newval) => {
//     document.querySelector('#cameraRef').setAttribute('gps-projected-camera', {
//         simulateLongitude: newval
//     })
// })
</script>
<template>
    <!-- simulateLatitude:${lat};simulateLongitude:${lng}; -->
    <!-- <a-camera id="cameraRef" ref="cameraRef" fov="100"
        :gps-projected-camera="`gpsMinDistance:1;maxDistance:3000;minDistance:1;`"
        rotation-reader look-controls-enabled="false" arjs-look-controls="smoothingFactor: 0.1;touchEnabled:false;" /> -->

    <a-camera id="cameraRef" ref="cameraRef" :gps-new-camera="`maxDistance:3000;minDistance:1;gpsMinDistance:2;`"
        rotation-reader look-controls-enabled="false" arjs-look-controls="smoothingFactor: 0.1;touchEnabled:false;" />
</template>
