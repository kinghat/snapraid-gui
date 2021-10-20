<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { useFetch } from "@vueuse/core";

  import Home from "./views/Home.vue";
  import Login from "./views/Login.vue";
  import router from "./router";

  const { onFetchResponse, onFetchError } = useFetch(
    "http://localhost:8080/api/authenticate",
  ).post();
  onFetchResponse((response) => {
    console.log(`response.status: ${response.status}`);
    response.status === 200 ? router.push("/dashboard") : router.push("login");
  });

  // onFetchError((error) => {
  // });
</script>

<!-- <style>
  body {
    background-color: #bababa;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
  }
</style> -->
