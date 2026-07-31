<script setup lang="ts">
import { toRefs } from 'vue'
import { type User } from '@/types';


const props = defineProps<{
  user: User
}>();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { user } = toRefs(props);

const edit = (() => {

})
</script>
<template>
  <p>Edit user here</p>

  <button @click="edit">Edit</button>
</template>
