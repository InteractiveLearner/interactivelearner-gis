<template>
    <div v-if="authors && authors.length" class="authors">
        <span>By </span>
        <ul>
            <li v-for="(author, idx) in authors" :key="author.name">
                <template v-if="author.url">
                    <a :href="author.url" target="_blank" rel="noopener">{{ author.name }}</a>
                </template>
                <template v-else>
                    {{ author.name }}
                </template>
                <span v-if="idx < authors.length - 1">, </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, watch } from 'vue'

const { frontmatter } = useData()
const authors = ref([])

function updateAuthors() {
    if (frontmatter.value.authors) {
        let rawAuthors = Array.isArray(frontmatter.value.authors)
            ? frontmatter.value.authors
            : [frontmatter.value.authors]
        // Normalize to objects with name/url
        authors.value = rawAuthors.map(a =>
            typeof a === 'string'
                ? { name: a }
                : { name: a.name, url: a.url }
        )
    } else {
        authors.value = []
    }
}

// Initialize
updateAuthors()

// Watch for changes
watch(
    () => frontmatter.value.authors,
    updateAuthors
)
</script>

<style scoped>
.authors {
    margin: 1em 0;
}

.authors a {
    color: #14a02e;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.authors a:hover {
    color: #14a02eb2;
    text-decoration: underline;
}

.authors ul {
    display: inline;
    padding: 0;
    margin: 0;
    list-style: none;
}

.authors li {
    display: inline;
}
</style>