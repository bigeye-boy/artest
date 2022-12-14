<script setup>
</script>
<template>
    <!-- a-nft是定义图像跟踪实体的锚点 -->
    <!-- 在 url 使用到图像描述符的路径之前创建 -->
    <!-- 路径应该以名称结束，无需扩展名。举例来说，如果文件是“pinball.fset”那么路径的结尾单次就是“pinball” -->
    <a-nft type="nft"
        url="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex"
        smooth="true" smoothCount="10" smoothTolerance=".01" smoothThreshold="5">
        <a-entity
            gltf-model="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
            scale="1.8 1.8 1.8" position="0 -1 -60" rotation="0 -45 0">
        </a-entity>
    </a-nft>
    <a-nft type="nft" url="/src/assets/nft/2048" smooth="true" smoothCount="10" smoothTolerance=".01"
        smoothThreshold="5">
        <a-entity
            gltf-model="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
            scale="1.8 1.8 1.8" position="0 -1 -60" rotation="0 -45 0">
        </a-entity>
    </a-nft>
</template>
