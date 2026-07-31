<script setup lang="ts">
import type { Post, User } from '@/types';
import { onMounted, ref } from 'vue';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';

const user = ref<User | null>(null);
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const router = useRouter();
const posts = ref<Post[] | null>(null);

onMounted(() => {
  UserService.getUser(Number(props.id))
  .then((response) => {
    user.value = response.data;
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      router.push({
      name: '404-resource-view',
      params: { resource: 'user' }
    })
    } else {
    router.push({
      name: 'network-error-view'
    })
    }
  })
  UserService.getPosts(Number(props.id))
  .then((response) => {
    posts.value = response.data;
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      router.push({
      name: '404-resource-view',
      params: { resource: 'post' }
    })
    } else {
    router.push({
      name: 'network-error-view'
    })
    }
  })
})
</script>
<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <nav>
      <router-link :to="{ name: 'user-profile-view'}">
        Profile
      </router-link>
      |
      <router-link :to="{ name: 'user-post-view'}">
        Posts
    </router-link>
  </nav>
  <RouterView :user="user" :posts="posts" />
</div>
</template>
