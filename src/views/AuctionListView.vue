<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import AuctionCard from '@/components/AuctionCard.vue'
import type { Auction } from '@/types'
import AuctionService from '@/services/AuctionService'
import BaseInput from '@/components/BaseInput.vue'
import router from '@/router'

const auctions = ref<Auction[] | null>(null)
const totalAuctions = ref<number>(0);
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
    queryFunction = AuctionService.getAuctions(perPage.value, page.value);
  } else {
    queryFunction = AuctionService.getAuctionByKeyword(keyword.value, perPage.value, page.value)
  }
  queryFunction.then((response) => {
    auctions.value = response.data;
    console.log('auctions', auctions.value);
    totalAuctions.value = response.headers['x-total-count'];
    console.log('totalAuction', totalAuctions.value);
  }).catch(() => {
    router.push({ name: 'network-error-view' })
  })
}
</script>

<template>
  <h1>Auction</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        label="Search..."
        class="w-full"
        @input="updateKeyword"
      />
    </div>
    <div v-for="auction in auctions" :key="auction.id">
      <AuctionCard :auction="auction" />
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
