<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useFetch } from "@vueuse/core";

  const router = useRouter();
  const username = ref();
  const password = ref();
  const signIn = () => {
    const { onFetchResponse, onFetchError, error, data, statusCode } = useFetch(
      "http://localhost:8080/api/auth/signin",
      { credentials: "include" },
    ).post({ username: username.value, password: password.value });

    onFetchResponse((response) => {
      console.log(`signIn response.status: ${response.status}`);

      router.push("/dashboard");
    });

    onFetchError((error) => {
      console.log(`signInError: ${error}`);

      router.push("/");
    });
  };
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">Sign In</span>
      </div>
      <form class="mt-4" @submit.prevent="signIn">
        <label class="block">
          <span class="text-sm text-gray-700">Username</span>
          <input
            type="username"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            v-model="username"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            v-model="password"
          />
        </label>

        <!-- <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              />
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
            <a
              class="block text-sm text-indigo-700 fontme hover:underline"
              href="#"
              >Forgot your password?</a
            >
          </div>
        </div> -->
        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
