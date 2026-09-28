<script lang="ts" setup>
import EventService from '@/services/EventService';
import type { Organizer } from '@/types';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  organizer: Organizer
}>()

console.log(props.organizer)
const image = ref<string | null>(null)
onMounted(() => {
  if (props.organizer.images && props.organizer.images.length > 0) {
      EventService.getEventImages(props.organizer.images)
        .then((response) => {
          image.value = response[0]!;
        })
        .catch((error) => {
          console.error(error)
          image.value = props.organizer.images[0]!;
        })
    } else {
      image.value = null
    }
})
</script>

<template>
  <div class="border p-8">
    <p>{{ props.organizer.name }}</p>
    <p>{{ props.organizer.address }}</p>
    <img v-if="image" :src="image" alt="organizer image" class="w-40 h-40" />
  </div>
</template>
