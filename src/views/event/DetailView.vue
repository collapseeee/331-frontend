<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore();
const { message } = storeToRefs(store);

const props = defineProps<{
  event: Event
}>()
const { event } = toRefs(props);
</script>
<template>
  <div id="flashMessage" class="animate-fade" v-if="message && message.split(' ').at(0) === 'The'">
      <h4>{{ message }}</h4>
  </div>
  <p>{{ event.time }} on {{ event.date }} @ {{  event.location }}</p>
  <p>{{ event.description }}</p>
</template>
