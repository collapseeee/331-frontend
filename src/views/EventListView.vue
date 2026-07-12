<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventAdditionalCard from '@/components/EventAdditionalCard.vue'
import type { Event } from '@/types'
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)

onMounted(() => {
  EventService.getEvents().then((response) => {
    events.value = response.data
  })
})
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
