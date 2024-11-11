<script setup>
defineProps({
    imgSrc: String,
    description: String,
    anchorHref: String,
    anchorText: String,
});
</script>

<template>
    <div>
        <img :src="imgSrc" :alt="description" />
        <p class="description">{{ description }}</p>
        <a :href="anchorHref" target="_blank">{{ anchorText }}</a>
    </div>
</template>

<style scoped>
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
