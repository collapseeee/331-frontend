<script setup lang="ts">
import EventService from '@/services/EventService';
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import type { Organizer, Event } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import OrganizerService from '@/services/OrganizerService';

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
    name: ''
  },
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

      <label class="block text-gray-500 font-bold">Select an Organizer</label>
      <div class="relative w-1/4 mb-6 mx-auto">
        <select
          class="h-13 w-full pl-2.5 pr-6 text-xl align-middle appearance-none rounded-none border border-gray-400 focus:border-emerald-500 focus:outline-none"
          v-model="event.organizer.id"
        >
          <option
            v-for="option in organizers"
            :value="option.id"
            :key="option.id"
            :selected="option.id === event.organizer.id"
          >
            {{ option.name }}
          </option>
        </select>
        <svg
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2.5 fill-gray-700"
          viewBox="0 0 4 5"
        >
          <path d="M2 0L0 2h4zm0 5L0 3h4z" />
        </svg>
      </div>

      <button class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>
