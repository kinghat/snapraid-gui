<script setup lang="ts">
  import { reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useFetch } from "@vueuse/core";

  // import Home from "./views/Home.vue";
  // import Login from "./views/Login.vue";
  // import router from "./router";

  const router = useRouter();
  // router.push("/login");
  const { onFetchResponse, onFetchError, error, data, statusCode } = useFetch(
    "http://localhost:8080/api/authenticate",
  ).post();
  // const response = reactive({ error, data, statusCode });

  // console.log(`error: ${response.error}`);
  // console.log(`data: ${response.data}`);
  // console.log(`sttausCode: ${response.statusCode}`);

  // if (response.statusCode === 401) router.push("/login");

  onFetchResponse((response) => {
    console.log(`response.status: ${response.status}`);

    router.push("/dashboaord");
  });

  onFetchError((error) => {
    console.log(`error: ${error}`);

    router.push("/login");
  });
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <!-- <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700"
          >Snapraid GUI Home</span
        >
        statusCode: {{ response.statusCode }} Error: {{ response.error }} Data:
        {{ response.data }}
      </div> -->
      <div class="mt-6">
        <router-link to="/login">
          <button
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md  focus:outline-none hover:bg-indigo-500"
          >
            Login
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
