<script setup lang="ts">
import { toRefs } from 'vue'
import { type User } from '@/types';
import { useMessageStore } from '@/stores/message';
import { useRouter } from 'vue-router';

const props = defineProps<{
  user: User
}>();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { user } = toRefs(props);
const store = useMessageStore();
const router = useRouter();
const edit = (() => {
  store.updateMessage(`Updating "${props.user.name}" is in progress...`);
  setTimeout(() => {
    store.resetMessage();
    router.push({ name: 'user-list-view' })
  }, 5000);
})
</script>
<template>
  <p>Edit user here</p>

  <button @click="edit">Edit</button>
</template>
