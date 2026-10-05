<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { provide, ref } from 'vue';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'
import { useAuthStore } from './stores/auth';
const store = useMessageStore();
const authStore = useAuthStore();
const router = useRouter();
const { message } = storeToRefs(store);
const eventPerPage = ref<number>(3);
const auctionPerPage = ref<number>(5);
provide('eventPerPage', eventPerPage)
provide('auctionPerPage', auctionPerPage)
function logout() {
  authStore.logout()
  router.push({name: 'login'})
}
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message && message.split(' ').at(0) !== 'The'">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <RouterLink to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus"/>
                    <span class="ml-3">Sign Up</span>
                  </div>
                </RouterLink>
              </li>
              <li class="nav-item px-2">
                <RouterLink to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin"/>
                    <span class="ml-3">Login</span>
                  </div>
                </RouterLink>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <RouterLink to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount"/>
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </RouterLink>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout"/>
                    <span class="ml-3">Logout</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list-view', query: {page: 1, perPage: eventPerPage} }">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'user-list-view', query: {page: 1, perPage: eventPerPage} }">Users</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'organizer-list-view'}">Organizers</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'student-list-view'}">Students</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about'}">About</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'add-event'}">New Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'add-organizer'}">New Organizer</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'auction-list-view', query: {page: 1, perPage: auctionPerPage} }">Auction</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'setting-view', }">
            Setting
          </RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
nav {
  padding: 30px;
}

h2 {
  font-size: 20px;
}
</style>
