<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
const { popupState, setPopupState } = useGlobalState()
const closePopup = () => {
    setPopupState({
        show: false
    })
}
const clickDetail = () => {

}
</script>

<template>
    <div class="min-h-screen fixed top-0 left-0 w-full" v-if="popupState.show" @click="closePopup">
        <div v-if="popupState.type == '1'"
            class="bg-white px-4 py-3 rounded-md space-y-4 w-2/4 absolute top-1/3 left-1/2 transform -translate-x-1/2"
            @click.stop="">
            <div class="flex space-x-4">
                <img :src="popupState.info.img" class="w-10 h-10 rounded-full" alt="">
                <div>
                    <div>{{ popupState.info.name }}</div>
                    <div>{{ popupState.info.detail }}</div>
                </div>
            </div>
            <div class="px-2 py-1 text-center cursor-pointer bg-white border border-gray-300 rounded-md hover:bg-gray-300"
                @click="popupState.confirm">
                See Detail
            </div>
        </div>
        <div v-if="popupState.type == '2'">
            <div
                class="bg-#4b4b4b bg-opacity-40 text-white w-10/12 text-center rounded-lg px-2 py-3 mx-auto mt-25vh backdrop-blur-36">
                An object appeared in your way. Keep it to unlock special prizes.
            </div>
            <div class="text-center mt-6">
                <img :src="popupState.info.img" class="animate-bounce-in" alt="" />
            </div>
            <div class="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <img src="../assets/image/addCoupon.png" class="w-17" alt="">
            </div>

        </div>
    </div>
</template>
