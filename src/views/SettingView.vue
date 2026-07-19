<script setup lang="ts">
import { inject, type Ref } from 'vue';


const eventPerPage = inject<Ref<number>>('eventPerPage');

</script>
<template>
  <h1>This is the Setting Page</h1>
  <form>
    <label>Event per page: </label>
    <select v-model.number="eventPerPage">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </form>
</template>
