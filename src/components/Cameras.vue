<!-- minDistance: 小于当前位置【N】米的点不会显示 -->
<!-- maxDistance: 大于当前位置【N】米的点不会显示 -->
<!-- look-controls-enabled="false"
arjs-look-controls="smoothingFactor: 0.1" 减少摇动效果 -->
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useEventBus } from '@vueuse/core'
const { emit } = useEventBus('gps-update')
onMounted(() => {
    let cameraRef = document.querySelector('#cameraRef')
    cameraRef.addEventListener('gps-camera-update-position', (payload) => {
        console.log(payload.detail);
        emit(payload)
    });
})
</script>
<template>
    <!-- simulateLatitude:${lat};simulateLongitude:${lng}; -->
    <!-- <a-camera id="cameraRef" ref="cameraRef" fov="100"
        :gps-projected-camera="`gpsMinDistance:1;maxDistance:3000;minDistance:1;`"
        rotation-reader look-controls-enabled="false" arjs-look-controls="smoothingFactor: 0.1;touchEnabled:false;" /> -->

    <a-camera id="cameraRef" ref="cameraRef" :gps-new-camera="`maxDistance:3000;minDistance:1;gpsMinDistance:5;`"
        rotation-reader look-controls-enabled="false" arjs-look-controls="smoothingFactor: 0.1;touchEnabled:false;" />
</template>
