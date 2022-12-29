<script setup>
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Scene from '@/components/Scene.vue'
import Popup from '@/components/Popup.vue'
import Authority from '@/components/Authority.vue'
const showAr = ref(false)
const authScope = useStorage('authScope', {})
console.log(authScope.value.camera);
</script>
<template>
    <Scene v-if="authScope.camera && authScope.location" />
    <Authority v-else></Authority>
    <Popup></Popup>

</template>