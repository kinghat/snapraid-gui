import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
