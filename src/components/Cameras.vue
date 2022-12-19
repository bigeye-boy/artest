<!-- minDistance: 小于当前位置【N】米的点不会显示 -->
<!-- maxDistance: 大于当前位置【N】米的点不会显示 -->
<!-- look-controls-enabled="false"
arjs-look-controls="smoothingFactor: 0.1" 减少摇动效果 -->
<script setup>
defineProps({
    center: Array
})

</script>
<template>
    <a-camera id="cameraRef" ref="cameraRef"
        :gps-projected-camera="`simulateLatitude:${center[0]};simulateLongitude:${center[1]}`" rotation-reader
        look-controls-enabled="false" arjs-look-controls="smoothingFactor: 0.1" />
</template>
