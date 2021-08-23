<script setup lang="ts">
  import { reactive, Ref, ref } from "vue";
  import { useMainStore } from "@/stores/main";
  import { createFetch } from "@vueuse/core";

  enum Routes {
    Status = "status",
    Sync = "sync",
    Diff = "diff",
    Smart = "smart",
    Scrub = "scrub",
  }
  const store = useMainStore();
  const baseRoute = `http://localhost:8080/api/snapraid`;
  const endPoint = ref("");
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
  } = useSnapraidFetch(endPoint).json();
  const text = reactive({
    // response,
    isFinished,
    isFetching,
    canAbort,
    statusCode,
    error,
    data,
  });

  function executeFetch(routeEndPoint: string) {
    endPoint.value = routeEndPoint;

    execute();
  }

  function useSnapraidFetch(route: Ref<string>) {
    const fetchFactory = createFetch({
      baseUrl: baseRoute,
      options: {
        immediate: false,
      },
    });

    return fetchFactory(route);
  }
</script>
<template>
  <h1>Snapraid GUI</h1>
  <button @click="executeFetch(Routes.Status)">get status</button>
  <button @click="executeFetch(Routes.Smart)">get smart</button>
  <button @click="executeFetch(Routes.Diff)">get diff</button>
  <button @click="executeFetch(Routes.Sync)">start sync</button>
  <button @click="executeFetch(Routes.Scrub)">start scrub</button>
  <pre v-if="isFinished">
    {{ text }}
    {{ store.name }}
  </pre>
</template>
