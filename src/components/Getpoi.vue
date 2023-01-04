<script setup>
import { onMounted, ref } from 'vue'
import { useClipboard, useEventBus } from '@vueuse/core'
const latitude = ref(0)
const longitude = ref(0)
let source = ref('')
const { text, copy, copied, isSupported } = useClipboard({ source })
const { on } = useEventBus('gps-update')
const watchLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                latitude.value = position.coords.latitude
                longitude.value = position.coords.longitude
                source.value = `"lat": ${latitude.value},"lng": ${longitude.value}`
                // position.value = { lat: position.coords.latitude, lng: position.coords.longitude }
            },
            () => {
                alert('Error: The Geolocation service failed.')
            },
        )
    }
    else {
        // Browser doesn't support Geolocation
        alert('Browser doesn\'t support Geolocation')
    }
}

onMounted(() => {

    on((message) => {
        console.log('@@', message);
        latitude.value = message.detail.position.latitude
        longitude.value = message.detail.position.longitude
        source.value = `"lat": ${latitude.value},"lng": ${longitude.value}`
    })
    // watchLocation()
})
</script>
<template>
    <div class="fixed bottom-0 text-white">
        <div>当前位置：</div>
        <div>"lat": {{ latitude }},"lng": {{ longitude }}</div>
        <button @click="copy()" class="h-8 w-full mt-2">
            <span v-if='!copied'>一键复制</span>
            <span v-else>复制成功!</span></button>
    </div>

</template>
