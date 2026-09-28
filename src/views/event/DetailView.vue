<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import EventService from '@/services/EventService'

const store = useMessageStore()
const { message } = storeToRefs(store)

const props = defineProps<{
  event: Event
}>()
const { event } = toRefs(props)

const images = ref<string[]>([])

console.log(event.value)

watch(
  () => props.event,
  (newEvent) => {
    if (newEvent && newEvent.images && newEvent.images.length > 0) {
      EventService.getEventImages(newEvent.images)
        .then((response) => {
          images.value = response
        })
        .catch((error) => {
          console.error(error)
          images.value = newEvent.images
        })
    } else {
      images.value = []
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div id="flashMessage" class="animate-fade" v-if="message && message.split(' ').at(0) === 'The'">
    <h4>{{ message }}</h4>
  </div>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <p>By {{ event.organizer.name }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img v-for="image in images" :key="image" :src="image" alt="events image"
    class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg">
  </div>
</template>

