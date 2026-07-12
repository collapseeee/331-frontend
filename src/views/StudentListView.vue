<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type { Student } from '@/types'
import { onMounted, ref } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<Student[] | null>(null)

onMounted(() => {
  StudentService.getStudents().then((response) => {
    students.value = response.data
  })
})
</script>

<template>
  <h1>Students</h1>
  <div class="students">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
