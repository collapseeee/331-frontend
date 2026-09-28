<script lang="ts" setup>
import OrganizerService from '@/services/OrganizerService';
import type { Organizer } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import OrganizerCard from '@/components/OrganizerCard.vue';

const organizers = ref<Organizer[]>([]);
const router = useRouter();

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
    <h1>Event Organizers</h1>
    <div class="gap-4 flex justify-center">
      <OrganizerCard v-for="organizer in organizers" :key="organizer.id!" :organizer="organizer" @click="$router.push({ name: 'organizer-detail-view', params: { id: organizer.id } })" />
    </div>
  </div>
</template>
