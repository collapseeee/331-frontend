<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { provide, ref } from 'vue';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { SpeedInsights } from '@vercel/speed-insights/vue';
const store = useMessageStore();
const { message } = storeToRefs(store);
const eventPerPage = ref<number>(3);
provide('eventPerPage', eventPerPage)
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message && message.split(' ').at(0) !== 'The'">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list-view', query: {page: 1, perPage: eventPerPage} }">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'user-list-view', query: {page: 1, perPage: eventPerPage} }">Users</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'student-list-view'}">Students</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about'}">About</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'add-event'}">New Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'add-organizer'}">New Organizer</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'setting-view', }">
            Setting
          </RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
nav {
  padding: 30px;
}

h2 {
  font-size: 20px;
}
</style>
