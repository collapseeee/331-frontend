<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import type { User } from '@/types'
import { computed, onMounted, ref, watchEffect } from 'vue'
import UserService from '@/services/UserService'

const users = ref<User[] | null>(null)
const totalUsers = ref<number>(0);
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalUsers.value / perPage.value)
  return page.value < totalPages;
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 2
  }
})
const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
onMounted(() => {
  watchEffect(() => {
    users.value = null
    UserService.getUsers(perPage.value, page.value)
      .then((response) => {
        users.value = response.data
        totalUsers.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Users List</h1>
  <div class="users">
    <div v-for="user in users" :key="user.id">
      <UserCard :user="user" />
    </div>
    <div class="pagination">
      <RouterLink
      id="page-prev"
      :to="{ name: 'user-list-view', query: { page: page - 1, perPage: perPage }}"
      rel="prev"
      v-if="page != 1"
      >
        &#60; Previous Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'user-list-view', query: { page: page + 1, perPage: perPage }}"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
