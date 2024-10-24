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
        <p>{{ description }}</p>
        <a :href="anchorHref" target="_blank">{{ anchorText }}</a>
    </div>
</template>

<style scoped>
div {
    text-align: center;
}

p {
    margin: 0;
}
</style>
