<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue';
import OrganizerService from '@/services/OrganizerService';
import { useMessageStore } from '@/stores/message';
import type { Organizer } from '@/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const organizer = ref<Organizer>({
  id: null,
  name: '',
  address: '',
  image: []
});

const router = useRouter();
const store = useMessageStore();
function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      store.updateMessage("You have successfully add a new organizer for " + response.data.organizerName + "! Check you database!!!");
      setTimeout(() => {
        store.resetMessage();
      }, 3000);
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer()">
      <h3>Your Organizer Information</h3>
      <label class="block text-gray-500 font-bold">Organizer Name</label>
      <input v-model="organizer.name" type="text" placeholder="Organizer Name" class="h-13 w-1/4 px-2.5 text-xl border border-gray-400 focus:border-emerald-500 focus:outline-none mb-6" />
      <label class="block text-gray-500 font-bold">Address</label>
      <input v-model="organizer.address" type="text" placeholder="Address" class="h-13 w-1/4 px-2.5 text-xl border border-gray-400 focus:border-emerald-500 focus:outline-none mb-6" />
      <h3>Images</h3>
      <ImageUpload v-model="organizer.image"/>
      <button class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none" type="submit">Submit</button>
    </form>
    <pre>{{ organizer }}</pre>
  </div>
</template>
