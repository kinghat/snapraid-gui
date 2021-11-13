import { createRouter, createWebHistory } from "vue-router";
import useAuth from "@/composables/useAuth";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const { isAuthorized } = useAuth();
const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthorizedResponse = await isAuthorized();

  console.log("toRoute: ", to);
  console.log("isAuthorizedResponse: ", isAuthorizedResponse);

  if (isAuthorizedResponse) {
    const authorizedRoutes = ["Home", "Login"];

    if (typeof to.name === "string" && authorizedRoutes.includes(to.name))
      next({ name: "Dashboard" });
    // if (to.name === "Home") next({ name: "Dashboard" });
    // if (to.name === "Login") next({ name: "Dashboard" });
    else next();
  } else {
    if (to.name !== "Login") next({ name: "Login" });
    else next();
  }
});

export default router;
