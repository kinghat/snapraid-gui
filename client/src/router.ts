import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/main";

import useAuth from "@/composables/useAuth";
import Home from "@/views/Home.vue";
import Setup from "@/views/Setup.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Dashboard from "@/views/Dashboard.vue";
import ConnectionRefused from "@/views/ConnectionRefused.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard" },
  { path: "/setup", component: Setup, name: "Setup" },
  { path: "/signin", component: SignIn, name: "SignIn" },
  { path: "/signup", component: SignUp, name: "SignUp" },
  {
    path: "/connection_refused",
    component: ConnectionRefused,
    name: "ConnectionRefused",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const { isAuthorized } = useAuth();
// const mainStore = useMainStore();

router.beforeEach(async (to, from) => {
  const isAuthorizedResponse = await isAuthorized();
  const { hasServerConnection } = useMainStore();

  if (!hasServerConnection) {
    if (to.name !== "ConnectionRefused") {
      return { name: "ConnectionRefused" };
    }
  } else if (isAuthorizedResponse) {
    const authorizedRoutes = ["Home", "SignIn"];

    if (typeof to.name === "string" && authorizedRoutes.includes(to.name)) {
      return { name: "Dashboard" };
    } else return;
  } else {
    if (to.name === "SignUp") {
      return;
    } else if (to.name !== "SignIn") {
      return { name: "SignIn" };
    } else return;
  }
});

export default router;
