<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types';
import { useMessageStore } from '@/stores/message';
import { useRouter } from 'vue-router';

const props = defineProps<{
  event: Event
}>();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props);
const store = useMessageStore();
const router = useRouter();
const edit = (() => {
  store.updateMessage(`The ${props.event.title} has been updated!`);
  setTimeout(() => {
    store.resetMessage();
  }, 3000);
  router.push({ name: 'event-detail-view', params: { id: props.event.id }})
})
</script>
<template>
  <p>Edit event here</p>

  <button @click="edit">Edit</button>
</template>
