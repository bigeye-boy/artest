<script setup>
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Scene from '@/components/Scene.vue'
import Popup from '@/components/Popup.vue'
import Authority from '@/components/Authority.vue'
import Tip from '@/components/Tip.vue'
import Getpoi from '@/components/Getpoi.vue'
import { useGlobalState } from '@/store'
const { popupState } = useGlobalState()
const showAuthority = ref(true)
const authScope = useStorage('authScope', {})
console.log(authScope.value.camera);
// authScope.camera && authScope.location
</script>
<template>
    <Authority v-if="showAuthority" @openAr="showAuthority = false"></Authority>
    <Scene :class="{ 'filter-blur-5': popupState.show }" v-else />
    <Popup></Popup>
    <Tip></Tip>
    <Getpoi></Getpoi>

</template>