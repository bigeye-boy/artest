<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
// import "aframe";
// import 'aframe-look-at-component'
// import '@ar-js-org/ar.js/aframe/build/aframe-ar-nft'
// import '@ar-js-org/ar.js/aframe/build/aframe-ar-location-only'
// import '@ar-js-org/ar.js'
import qs from 'qs'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useGlobalState } from '@/store'
import Camera from './Cameras.vue'
import Assets from './Assets.vue'
import Nft from './Nft.vue'
import Points from './Points.vue'
import Directions from './Directions.vue'
import Place from './Place.vue'
import Mind from './Mind.vue'
import Panel from './Panel.vue'

const store = useGlobalState()
const sceneRef = ref(null)
const googleKey = 'AIzaSyA1k0MeGsMaYh7nfJz3v47yIxr3rMtI4w4'
const query = {
    location: `${store.centerPoi.value[0]},${store.centerPoi.value[1]}`,
    key: googleKey,
    radius: 2000,
    type: 'park'
}
onMounted(() => {
    sceneRef.value.addEventListener('click', (e) => {
    })
})
onBeforeUnmount(() => {
    location.reload()
})
const clickImg2 = (e) => {
    console.log(e);
}
AFRAME.registerComponent('clicker', {
    init: function () {
        this.el.addEventListener('click', e => {
            alert('Box clicked!');
        });
    }
});
// const { isFetching, error, data } = useAxios(`/maps/api/place/nearbysearch/json?${qs.stringify(query)}`)
// sourceWidth:${scenewidth}; displayWidth: ${scenewidth}; displayHeight: ${sceneheight};
</script>

<template>
    <div class="flex flex-col min-h-screen h-full">
        <a-scene ref="sceneRef" class="w-full h-full min-h-screen overflow-hidden relative" embedded
            vr-mode-ui="enabled: false" arjs="sourceType: webcam;videoTexture: true;debugUIEnabled: false;"
            renderer='antialias: true; alpha: true' cursor="rayOrigin: mouse; fuse: false">
            <Assets></Assets>
            <Camera :center="[store.centerPoi.value.lat, store.centerPoi.value.lng]"></Camera>
            <Place></Place>
            <!-- <Nft></Nft> -->
            <!-- <Points></Points> -->
            <!-- <Directions></Directions> -->
            <!-- <Mind></Mind> -->

        </a-scene>
        <!-- <Panel></Panel> -->
    </div>
</template>

<style>

</style>
