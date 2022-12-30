<script setup>
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Scene from '@/components/Scene.vue'
import Popup from '@/components/Popup.vue'
import Authority from '@/components/Authority.vue'
import { useGlobalState } from '@/store'
const { popupState } = useGlobalState()
const showAr = ref(false)
const authScope = useStorage('authScope', {})
console.log(authScope.value.camera);
</script>
<template>
    <Scene :class="{'filter-blur-5':popupState.show}" v-if="authScope.camera && authScope.location" />
    <Authority v-else></Authority>
    <Popup></Popup>

</template>