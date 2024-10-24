<script setup>
defineProps({
    imgSrc: String,
    imgAlt: String,
    description: String,
    anchorHref: String,
    anchorText: String,
});
</script>

<template>
    <div>
        <img :src="imgSrc" :alt="imgAlt" />
        <p class="description">{{ description }}</p>
        <a :href="anchorHref" target="_blank">{{ anchorText }}</a>
    </div>
</template>

<style scoped>
div {
    text-align: center;
}

.description {
    margin: 0;
}
</style>
