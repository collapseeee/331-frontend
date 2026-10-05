<script lang="ts" setup>
import InputText from '@/components/InputText.vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()

const validationSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  }
});

const { value: firstname } = useField<string>('firstname');
const { value: lastname } = useField<string>('lastname');
const { value: username } = useField<string>('username');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit((values) => {
  authStore.register({
    firstname: values.firstname,
    lastname: values.lastname,
    username: values.username,
    email: values.email,
    password: values.password
  })
    .then(() => {
      messageStore.updateMessage('Registration successful!')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
      router.push({ name: 'event-list-view' })
    })
    .catch((err) => {
      const message = err.response?.data?.message || 'Could not register'
      messageStore.updateMessage(message)
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
});
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" src="@/assets/logo.svg" alt="CAMT">
      <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create an account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Fill in the details below to register
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-5" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="firstname" class="block text-left text-sm font-medium leading-6 text-gray-900">First Name</label>
            <InputText :error="errors['firstname']" id="firstname" v-model="firstname" type="text" placeholder="First Name" />
          </div>
          <div>
            <label for="lastname" class="block text-left text-sm font-medium leading-6 text-gray-900">Last Name</label>
            <InputText :error="errors['lastname']" id="lastname" v-model="lastname" type="text" placeholder="Last Name" />
          </div>
        </div>

        <div>
          <label for="username" class="block text-left text-sm font-medium leading-6 text-gray-900">Username</label>
          <InputText :error="errors['username']" id="username" v-model="username" type="text" placeholder="Username" />
        </div>

        <div>
          <label for="email" class="block text-left text-sm font-medium leading-6 text-gray-900">Email address</label>
          <InputText :error="errors['email']" id="email" v-model="email" type="email" placeholder="Email Address" />
        </div>

        <div>
          <label for="password" class="block text-left text-sm font-medium leading-6 text-gray-900">Password</label>
          <InputText :error="errors['password']" id="password" type="password" v-model="password" placeholder="Password" />
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition-colors duration-150"
          >
            {{ isSubmitting ? 'Registering...' : 'Sign up' }}
          </button>
        </div>
      </form>

      <p class="mt-8 text-center text-sm text-gray-500">
        Already have an account?
        {{ ' ' }}
        <router-link :to="{ name: 'login-view' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in here
        </router-link>
      </p>
    </div>
  </div>
</template>
