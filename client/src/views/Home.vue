<script setup lang="ts">
  import { useRouter } from "vue-router";

  const router = useRouter();

  function login() {
    router.push("/login");
  }
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700"
          >Snapraid GUI Home</span
        >
      </div>
      <div class="mt-6">
        <button
          type="submit"
          class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md  focus:outline-none hover:bg-indigo-500"
        >
          <router-link to="/login">Login</router-link>
        </button>
      </div>
    </div>
  </div>
</template>
