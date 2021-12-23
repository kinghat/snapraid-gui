import { createRouter, createWebHistory } from "vue-router";
import useAuth from "@/composables/useAuth";
import Home from "@/views/Home.vue";
import Setup from "@/views/Setup.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Dashboard from "@/views/Dashboard.vue";

const { isAuthorized } = useAuth();
const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard" },
  { path: "/setup", component: Setup, name: "Setup" },
  { path: "/signin", component: SignIn, name: "SignIn" },
  { path: "/signup", component: SignUp, name: "SignUp" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthorizedResponse = await isAuthorized();
  console.log("isAuthorizedResponse: ", isAuthorizedResponse);

  if (isAuthorizedResponse) {
    const authorizedRoutes = ["Home", "SignIn"];

    if (typeof to.name === "string" && authorizedRoutes.includes(to.name))
      next({ name: "Dashboard" });
    else next();
  } else {
    if (to.name === "SignUp") next();
    else if (to.name !== "SignIn") next({ name: "SignIn" });
    else next();
  }
});

export default router;
