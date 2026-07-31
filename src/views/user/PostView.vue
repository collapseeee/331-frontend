<script setup lang="ts">
import { toRefs } from 'vue'
import type { Post, } from '@/types';
import PostCard from '@/components/PostCard.vue';

const props = defineProps<{
  posts: Post[]
}>();

const { posts } = toRefs(props);
</script>
<template>
  <div>
    <h1>Posts</h1>
    <div class="posts">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
