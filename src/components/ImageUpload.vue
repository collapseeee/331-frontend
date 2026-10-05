<script lang="ts" setup>
import { computed, ref } from 'vue';
import Uploader from 'vue-media-upload';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()

interface UploadMedia {
  name: string
  url?: string
  size?: string
  type?: string
}
const modelValue = defineModel<string[]>({
  default: () => [],
})
const convertStringToMedia = (str: string[]): UploadMedia[] => {
  return str.map((element) => {
    return {
      name: element,
    }
  })
}
const convertMediaToString = (media: UploadMedia[]): string[] => {
  const output: string[] = []
  media.forEach((element) => {
    output.push(element.name)
  })
  return output
}
const media = ref<UploadMedia[]>(convertStringToMedia(modelValue.value))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const onChanged = (files: UploadMedia[]): void => {
  modelValue.value = convertMediaToString(files)
}

const authorizeHeader = computed(() => {
  return { authorization: authStore.authorizationHeader }
})
</script>
<template>
  <Uploader :server="uploadUrl" :media="media" @change="onChanged" :headers="authorizeHeader" />
</template>
