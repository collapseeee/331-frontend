<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventAdditionalCard from '@/components/EventAdditionalCard.vue'
import type { Event } from '@/types'
import { ref } from 'vue'

const events = ref<Event[]>([
  {
    id: 5928101,
    category: 'animal welfare',
    title: 'Cat Adoption Day',
    description: 'Find your new feline friend at this event.',
    location: 'Meow Town',
    date: 'January 28, 2026',
    time: '12:00',
    petsAllowed: true,
    organizer: 'Kat Laydee',
  },
  {
    id: 4582797,
    category: 'food',
    title: 'Community Gardening',
    description: 'Join us as we tend to the community edible plants.',
    location: 'Flora City',
    date: 'March 14, 2026',
    time: '10:00',
    petsAllowed: true,
    organizer: 'Fern Pollin',
  },
  {
    id: 8419988,
    category: 'sustainability',
    title: 'Beach Cleanup',
    description: 'Help pick up along the shore.',
    location: 'Playa Del Carmen',
    date: 'July 22, 2026',
    time: '11:00',
    petsAllowed: false,
    organizer: 'Carey Wales',
  },
])
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventAdditionalCard :event="event" />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
