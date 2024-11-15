<script setup>
defineProps({
    imgSrc: String,
    description: String,
    anchorHref: String,
    anchorText: String,
});

function isSvg(src) {
    return src.endsWith('.svg');
}
</script>

<template>
    <div>
        <img :src="imgSrc" :alt="description" :class="{ 'svg-background': isSvg(imgSrc) }" />
        <p class="description">{{ description }}</p>
        <a :href="anchorHref" target="_blank">{{ anchorText }}</a>
    </div>
</template>

<style scoped>
/* Need a white background for svg's that have black text */
html[class="dark"] .svg-background {
  background-color: #f0f0f0; 
}

div {
    text-align: center;
}

img {
    display: block;
    margin: 0 auto;
}

.description {
    margin: 0;
}
</style>
