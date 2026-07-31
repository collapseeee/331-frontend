<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { provide, ref } from 'vue';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore();
const { message } = storeToRefs(store);
const eventPerPage = ref<number>(3);
provide('eventPerPage', eventPerPage)
</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message && message.split(' ').at(0) !== 'The'">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view', query: {page: 1, perPage: eventPerPage} }">Event</RouterLink> |
          <RouterLink :to="{ name: 'user-list-view', query: {page: 1, perPage: eventPerPage} }">Users</RouterLink> |
          <RouterLink :to="{ name: 'student-list-view'}">Students</RouterLink> |
          <RouterLink :to="{ name: 'about'}">About</RouterLink> |
          <RouterLink :to="{ name: 'setting-view', }">
            Setting
          </RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}

@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
