import { createApp } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import "@/assets/index.css";

import App from "@/App.vue";

createApp(App).use(router).use(createPinia()).mount("#app");
