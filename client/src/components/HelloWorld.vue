<script setup lang="ts">
  import { reactive, ref } from "vue";
  import { createFetch } from "@vueuse/core";

  const baseRoute = `http://localhost:8080/api/snapraid`;
  let endRoute = ref("");
  enum Routes {
    Status = "status",
    Sync = "sync",
    Diff = "diff",
    Smart = "smart",
    Scrub = "scrub",
  }
  const useSnapraidFetch = createFetch({
    baseUrl: baseRoute,
    options: {
      immediate: false,
    },
  });
  const {
    data,
    error,
    abort,
    response,
    statusCode,
    isFetching,
    isFinished,
    canAbort,
    execute,
  } = useSnapraidFetch(endRoute).json();
  const text = reactive({
    // response,
    isFinished,
    isFetching,
    canAbort,
    statusCode,
    error,
    data,
  });
  function executeFetch(test: string) {
    endRoute.value = test;
    console.log(endRoute);

    execute();
  }
  // function useSnapraidFetch(route: string) {
  //   const fetchFactory = createFetch({
  //     baseUrl: baseRoute,
  //     options: {
  //       immediate: false,
  //     },
  //   });
  //   return fetchFactory(route);
  // }
  // { statusCode, error, data, execute } = useSnapraidFetch(Routes.Status);
</script>
<template>
  <h1>Snapraid GUI</h1>
  <button @click="executeFetch(Routes.Status)">get status</button>
  <button @click="executeFetch(Routes.Smart)">get smart</button>
  <button @click="executeFetch(Routes.Sync)">start sync</button>
  <button @click="executeFetch(Routes.Diff)">get diff</button>
  <button @click="executeFetch(Routes.Scrub)">start scrub</button>
  <pre v-if="isFinished">
    {{ text }}
  </pre>
</template>
