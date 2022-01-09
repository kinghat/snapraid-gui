<script setup lang="ts">
  import Header from "@/components/Header.vue";
  import { useRouter } from "vue-router";
  import { useFetch } from "@vueuse/core";

  // const router = useRouter();
  // const { onFetchResponse, onFetchError, error, data, statusCode } = useFetch(
  //   "http://localhost:8080/api/setup",
  //   // {
  //   //   credentials: "include",
  //   // },
  // ).get();

  // onFetchResponse((response) => {
  //   console.log(`response.status: ${response.status}`);

  //   router.push("/signin");
  // });

  // onFetchError((error) => {
  //   console.log("setupFetchError:\n", error);

  //   router.push("/setup");
  // });
</script>

<template>
  <Header />
  <router-view />
</template>

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
