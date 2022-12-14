<script setup>
defineProps({
    scale: String,
    position: String,
    lookAt: String,
    rotation: String
})
</script>
<template>
    <a-entity id="bottom-arrow" :position="position" :rotation="rotation" :scale="scale" :look-at="lookAt">
        <a-entity position="0 0 0" scale="1 1 1">
            <a-image src="#arrow_bottom" rotation="0 90 0"></a-image>
        </a-entity>

        <!-- <a-entity position="10 10 0" scale="86 106 170" visible=""><a-image src="#arrow_bottom" width="0.2"
                height="0.16" rotation="0 90 0" material="" geometry=""></a-image></a-entity>
        <a-entity position="20 20 0" scale="86 100 159" visible=""><a-image src="#arrow_bottom" width="0.2"
                height="0.16" rotation="0 90 0" material="" geometry=""></a-image></a-entity>
        <a-entity position="30 30 0" scale="86 100 159" visible=""><a-image src="#arrow_bottom" width="0.2"
                height="0.16" rotation="0 90 0" material="" geometry=""></a-image></a-entity>
        <a-entity position="40 40 0" scale="86 100 159" visible=""><a-image src="#arrow_bottom" width="0.2"
                height="0.16" rotation="0 90 0" material="" geometry=""></a-image></a-entity>
        <a-entity position="50 50 0" scale="86 100 159" visible=""><a-image src="#arrow_bottom" width="0.2"
                height="0.16" rotation="0 90 0" material="" geometry=""></a-image></a-entity>
        <a-entity position="60 60 0" scale="86 100 159" visible=""><a-image src="#arrow_bottom" width="0.2"
                height="0.16" rotation="0 90 0" material="" geometry=""></a-image></a-entity> -->

    </a-entity>
</template>
