<script setup lang="ts">
import EventService from '@/services/EventService';
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import type { Organizer, Event } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import OrganizerService from '@/services/OrganizerService';
import BaseSelect from '@/components/BaseSelect.vue';
import ImageUpload from '@/components/ImageUpload.vue';

const event = ref<Event>({
  id: null,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id: 0,
    name: '',
    images: []
  },
  images: []
});

const router = useRouter();
const store = useMessageStore();
function saveEvent() {
  console.log('Save an event object: ', event.value);
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      store.updateMessage("You have successfully add a new event for " + response.data.title);
      setTimeout(() => {
        store.resetMessage();
      }, 3000);
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

const organizers = ref<Organizer[]>([]);
onMounted(() => {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data;
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
</script>

<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent()">
      <BaseInput v-model="event.category" label="Category" />

      <h3>Name & Describe your event</h3>
      <BaseInput v-model="event.title" label="Title" />
      <BaseInput v-model="event.description" label="Description" />

      <h3>Where is your event?</h3>
      <BaseInput v-model="event.location" label="Location" />

      <BaseSelect v-model="event.organizer.id" label="Organizer" :options="organizers" />

      <h3>The image of the Event</h3>
      <ImageUpload v-model="event.images"/>

      <button class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>
