<script setup>
import { useUserMedia, useStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue';
const emit = defineEmits(['openAr'])
// const authScope = useStorage('authScope', {
//     camera: false,
//     location: false
// })
const authScope = ref({
    camera: false,
    location: false
})
const accessInfo = ref({
    show: false,
    title: '',
    content: "",
    icon: '',
    confirm: () => {

    }
})
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                authScope.value.location = true
                accessInfo.value = {
                    show: false,
                    title: '',
                    content: "",
                    icon: '',
                    confirm: () => {
                    }
                }
            },
            () => {
                console.log('失败');
                accessInfo.value = {
                    show: true,
                    title: 'Allow location sharing',
                    content: "In order to enjoy Go, it is required to have access to your location",
                    icon: 'i-ri-map-pin-line',
                    confirm: () => {
                        getLocation()
                    }
                }
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
const getMedia = () => {
    start().then(() => {
        authScope.value.camera = true
        stop()
        accessInfo.value = {
            show: false,
            title: '',
            content: "",
            icon: '',
            confirm: () => {
            }
        }
        getLocation()
    }).catch(err => {
        accessInfo.value = {
            show: true,
            title: 'Allow camera access',
            content: "In order to enjoy Go, it is required to have access to your camera",
            icon: 'i-ri-camera-line',
            confirm: () => {
                getMedia()
            }
        }
        console.log(err);
    })
}
const openAuth = () => {
    getMedia()

}
onMounted(() => {
    openAuth()
})
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
                <!-- <div class="flex space-x-6">
                    <img class="w-12 h-12" src="../assets/image/users.png" alt="">
                    <div class="flex flex-col">
                        <div class="">Residents</div>
                        <div class="font-light c-#F6F5F2">Route guidance along the trail</div>
                    </div>
                </div> -->
                <div class="flex space-x-6">
                    <img class="w-12 h-12" src="../assets/image/data.png" alt="">
                    <div class="flex flex-col">
                        <div class="">Tokens</div>
                        <div class="font-light c-#F6F5F2">Find objects along the way.</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="accessInfo.show"
            class="bg-#0072A2 rounded-md px-4 py-6 w-10/12 mx-auto text-white mt-20 space-y-3 shadow">
            <div class="flex space-x-2 items-center">
                <div :class="accessInfo.icon" class="text-2xl text-white">
                </div>
                <span>{{ accessInfo.title }}</span>
            </div>
            <div class="mt-3">
                {{ accessInfo.content }}
            </div>
            <div class="flex justify-end">
                <div @click="accessInfo.confirm"
                    class="px-3 py-2 cursor-pointer rounded-md inline-block border border-white border-opacity-16 mr-0">
                    Allow access
                </div>
            </div>

        </div>

        <div v-if="authScope.camera && authScope.location"
            class="text-center fixed bottom-20 w-full text-white cursor-pointer py-4" @click="emit('openAr')">Tap to
            start using it
        </div>
    </div>
</template>

<style>
.startBg {
    background-image: url(../assets/image/Background.png);
    background-size: cover;
}
</style>