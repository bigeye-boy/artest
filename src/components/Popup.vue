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
    <div class="bg-black bg-opacity-25  min-h-screen fixed top-0 left-0 w-full" v-if="popupState.show"
        @click="closePopup">
        <div class="bg-white px-4 py-3 rounded-md space-y-4 w-2/4 absolute top-1/3 left-1/2 transform -translate-x-1/2"
            @click.stop="">
            <div class="flex space-x-4">
                <img :src="popupState.info.img" class="w-10 h-10 rounded-full" alt="">
                <div>
                    <div>{{ popupState.info.name }}</div>
                    <div>{{ popupState.info.detail }}</div>
                </div>
            </div>
            <div class="px-2 py-1 text-center bg-white border border-gray-300 rounded-md hover:bg-gray-300"
                @click="clickDetail">
                See Detail
            </div>
        </div>
    </div>
</template>