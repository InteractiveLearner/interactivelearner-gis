<script setup>
defineProps({
  sources: Array,
});
</script>

<template>
  <section class="sources-section">
    <ul class="sources-list">
      <li v-for="(source, index) in sources" :key="index" class="source-item">
        <a :href="source.url" target="_blank" rel="noopener noreferrer">
          {{ source.title }}
        </a>
        <div v-if="source.author" class="source-meta">
          <span v-if="source.author">{{ source.author }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.sources-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.source-item {
  margin-bottom: 1rem;
}

.source-item a {
  color: #14a02e;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.source-item a:hover {
  color: #14a02eb2;
  text-decoration: underline;
}

.source-meta {
  font-size: 0.9rem;
}
</style>