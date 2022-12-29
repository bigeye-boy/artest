<script setup>
import { useUserMedia, useStorage } from '@vueuse/core'
const authScope = useStorage('authScope', {
    camera: false,
    location: false
})
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                authScope.value.location = true
            },
            () => {
                alert('Error: The Geolocation service failed.')
            },
        )
    }
    else {
        alert('Browser doesn\'t support Geolocation')
    }
}

const { start, stop } = useUserMedia({
    audioDeviceId: false
})
const openAuth = () => {
    start().then(() => {
        authScope.value.camera = true
        stop()
    }).catch(err => {
        console.log(err);
    })

    getLocation()
}
</script>
<template>
    <div class="startBg min-h-screen">
        <div class="mx-8 text-white pt-20">
            <div class="text-xl  mb-6" @click="openAuth">Welcome to the AR experience</div>
            <div class="text-base leading-6 font-light">Get familiar with Augmented Reality but don't forget to monitor
                your
                phone’s battery.
            </div>
            <div class="mt-10 space-y-8">
                <div class="flex space-x-6">
                    <img class="w-12 h-12" src="../assets/image/location.png" alt="">
                    <div class="flex flex-col ">
                        <div class="">Places</div>
                        <div class="font-light c-#F6F5F2">Highlights, viewpoints, network coverage</div>
                    </div>
                </div>

                <div class="flex space-x-6">
                    <img class="w-12 h-12" src="../assets/image/users.png" alt="">
                    <div class="flex flex-col">
                        <div class="">Residents</div>
                        <div class="font-light c-#F6F5F2">Route guidance along the trail</div>
                    </div>
                </div>

                <div class="flex space-x-6">
                    <img class="w-12 h-12" src="../assets/image/key.png" alt="">
                    <div class="flex flex-col">
                        <div class="">Tokens</div>
                        <div class="font-light c-#F6F5F2">Find objects along the way.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center fixed bottom-20 w-full text-white cursor-pointer py-4" @click="openAuth">Tap to start
            using it
        </div>
    </div>
</template>

<style>
.startBg {
    background-image: url(../assets/image/Background.png);
    background-size: cover;
}
</style>