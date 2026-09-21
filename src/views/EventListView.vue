<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventAdditionalCard from '@/components/EventAdditionalCard.vue'
import type { Event } from '@/types'
import { computed, onMounted, ref, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import BaseInput from '@/components/BaseInput.vue'
import router from '@/router'

const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0);
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 1);
  return page.value < totalPages;
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 3
  }
})
const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
onMounted(() => {
  watchEffect(() => {
    updateKeyword();
  })
})

const keyword = ref('');
function updateKeyword() {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(1, page.value);
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 1, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data;
    console.log('events', events.value);
    totalEvents.value = response.headers['x-total-count'];
    console.log('totalEvent', totalEvents.value);
  }).catch(() => {
    router.push({ name: 'network-error-view' })
  })
}
</script>

<template>
  <h1>Events For Good</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        label="Search..."
        class="w-full"
        @input="updateKeyword"
      />
    </div>
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventAdditionalCard :event="event" />
    </div>
    <div class="pagination">
    <RouterLink
    id="page-prev"
    :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage }}"
    rel="prev"
    v-if="page != 1"
    >
      &#60; Previous Page
    </RouterLink>

    <RouterLink
      id="page-next"
      :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage }}"
      rel="next"
      v-if="hasNextPage"
    >
      Next Page &#62;
    </RouterLink>
  </div>
  </div>

</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
