<script lang="ts" setup>
import { ref } from 'vue';
import Uploader from 'vue-media-upload';

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
</script>
<template>
  <Uploader :server="uploadUrl" :media="media" @changed="onChanged" />
</template>
