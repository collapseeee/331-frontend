<script setup lang="ts">
import type { Event } from '@/types';
import { onMounted, ref } from 'vue';
import EventService from '@/services/EventService';

const event = ref<Event | null>(null);
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
onMounted(() => {
  EventService.getEvent(Number(props.id))
  .then((response) => {
    event.value = response.data;
  })
  .catch((error) => {
    console.error('There was an error!', error)
  })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view'}">
        Details
      </router-link>
      |
      <router-link :to="{ name: 'event-register-view'}">
        Register
      </router-link>
      |
      <router-link :to="{ name: 'event-edit-view'}">
        Edit
    </router-link>
  </nav>
  <RouterView :event="event" />
</div>
</template>
