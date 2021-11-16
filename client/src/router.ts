import { createRouter, createWebHistory } from "vue-router";
import useAuth from "@/composables/useAuth";
import Home from "@/views/Home.vue";
import Login from "@/views/SignIn.vue";
import Dashboard from "@/views/Dashboard.vue";

const { isAuthorized } = useAuth();
const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/signin", component: Login, name: "SignIn" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthorizedResponse = await isAuthorized();

  if (isAuthorizedResponse) {
    const authorizedRoutes = ["Home", "SignIn"];

    if (typeof to.name === "string" && authorizedRoutes.includes(to.name))
      next({ name: "Dashboard" });
    else next();
  } else {
    if (to.name !== "SignIn") next({ name: "SignIn" });
    else next();
  }
});

export default router;
