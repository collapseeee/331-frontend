<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const store = useUserStore();
const { user, posts } = storeToRefs(store);
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
      |
      <router-link :to="{ name: 'user-edit-view'}">
        Edit
      </router-link>
    </nav>
    <RouterView :user="user" :posts="posts" />
  </div>
</template>
