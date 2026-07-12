<script setup lang="ts">
import type { Student } from '@/types'

defineProps<{
  student: Student
}>()
</script>

<template>
  <div class="student-class">
    <div class="student-card">
      <h2>{{ student.name }} {{ student.surname }}</h2>
      <span>{{ student.gpa }}</span>
    </div>
  </div>
</template>

<style scoped>
.student-class {
  display: flex;
  justify-content: center;
}

.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 4px;
}

.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
