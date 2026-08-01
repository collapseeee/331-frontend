<script setup lang="ts">
import { toRefs } from 'vue'
import type { User } from '@/types';

const props = defineProps<{
  user: User
}>()
const { user } = toRefs(props);
</script>
<template>
  <div>
    <h1>User Profile</h1>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Username: {{ user.username }}</p>
    <p>Phone: {{ user.phone }}</p>
    <p>Address: {{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
    <p>Website: {{ user.website }}</p>
    <p>Company: {{ user.company.name }}</p>
  </div>
</template>
