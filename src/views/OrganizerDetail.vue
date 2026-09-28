<script lang="ts" setup>
import type { Organizer } from '@/types';

const props = defineProps<{
  organizer: Organizer
}>()
</script>
<template>
  <div class="flex items-center">
    <div class="p-6 border rounded-lg">
      <p>{{ props.organizer.name || props.organizer.organizationName }}</p>
      <p v-if="props.organizer.address">{{ props.organizer.address }}</p>
      <div v-if="props.organizer.images" class="flex flex-row flex-wrap justify-center">
        <img :src="organizer.images[0]" alt="events image" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg">
      </div>
    </div>
  </div>
</template>
