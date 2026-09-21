<script setup lang="ts">
// import { ref } from 'vue'
import type { Auction } from '@/types'

defineProps<{
  auction: Auction
}>()
// const event = ref({
//   id: 5928101,
//   category: 'animal welfare',
//   title: 'Cat Adoption Day',
//   description: 'Find your new feline friend at this event.',
//   location: 'Meow Town',
//   date: 'January 28, 2026',
//   time: '12:00',
//   petsAllowed: true,
//   organizer: 'Kat Laydee',
// })
</script>

<template>
    <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp">
      <h2>{{ auction.description }}</h2>
      <span>{{ auction.type }}</span>
      <p v-if="auction.successfulBid">Current Bid: {{ auction.successfulBid.amount }}</p>
      <p v-else>No successful bid yet</p>
    </div>
</template>

<style scoped>
/*
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 4px;
}
*/

/*
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
*/

.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
