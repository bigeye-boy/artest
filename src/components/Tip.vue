<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store'
const { messageState, setMessageState, nearbyPoints } = useGlobalState()
const closePopup = () => {
    setMessageState({
        show: false
    })
}
watch(nearbyPoints.value, (oldval, newval) => {
    console.log(newval);
    if (newval.length > 0) {
        setMessageState({
            show: true
        })
    }
    else {
        setMessageState({
            show: false
        })
    }
})
</script>
<template>
    <div v-if="messageState.show"
        class="bg-#23211e fixed top-30 left-1/2 transform -translate-x-1/2 bg-opacity-30 text-white w-10/12 text-center rounded-lg px-4 py-6 text-base mx-auto  backdrop-blur-40">
        {{ messageState.content }}
    </div>
</template>