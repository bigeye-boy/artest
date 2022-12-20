<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import qs from 'qs'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useGlobalState } from '@/store'
import Camera from './Cameras.vue'
import Nft from './Nft.vue'
import Points from './Points.vue'
import Assets from './Assets.vue'
import Directions from './Directions.vue'



const store = useGlobalState()
const sceneRef = ref(null)
// const { width: scenewidth, height: sceneheight } = useElementSize(sceneRef)

console.log(store.centerPoi.value);
const googleKey = 'AIzaSyA1k0MeGsMaYh7nfJz3v47yIxr3rMtI4w4'
const query = {
    location: `${store.centerPoi.value[0]},${store.centerPoi.value[1]}`,
    key: googleKey,
    radius: 2000,
    type: 'park'
}

const npcEl = ref(null)

onMounted(() => {
    sceneRef.value.addEventListener('click', (e) => {
    })
})

onBeforeUnmount(() => {
    location.reload()
})
// const { isFetching, error, data } = useAxios(`/maps/api/place/nearbysearch/json?${qs.stringify(query)}`)
// sourceWidth:${scenewidth}; displayWidth: ${scenewidth}; displayHeight: ${sceneheight};
</script>

<template>
    <div class="flex flex-col min-h-screen h-full">
        <a-scene ref="sceneRef" class="w-full h-full overflow-hidden relative" embedded vr-mode-ui="enabled: false"
            arjs="sourceType: webcam;debugUIEnabled: false;trackingMethod: best;">
            <Assets></Assets>
            <Camera :center="[store.centerPoi.value.lat, store.centerPoi.value.lng]"></Camera>
            <!-- <Nft></Nft> -->
            <!-- <a-image ref="npcEl" src="/src/assets/image/marker-cite.png" rotation="0 0 0" width="0.5" height="0.5"
                position="0 1.6 -2.38"></a-image> -->

            <!-- <Points></Points> -->

            <Directions></Directions>




        </a-scene>
    </div>


</template>

<style>

</style>
