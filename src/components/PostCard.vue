<script setup lang="ts">
import type { Post } from '@/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="post-card">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    (UserID {{ post.id }})
  </div>
</template>

<style scoped>
.post-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 4px;
}

.post-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
