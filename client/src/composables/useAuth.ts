import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";

const useAuth = () => {
  const isAuthorized = async () => {
    let isAuthorized = false;
    const mainStore = useMainStore();
    const response = await fetch("http://localhost:8080/api/auth/authorize", {
      method: "POST",
      credentials: "include",
    });

    response.status === 202 ? (isAuthorized = true) : (isAuthorized = false);

    mainStore.isAuthorized = isAuthorized;

    return isAuthorized;
  };
  const signOut = async () => {
    const router = useRouter();

    const response = await fetch("http://localhost:8080/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    response.status === 200 ? router.push("/signin") : router.push("/signin");
  };

  return { isAuthorized, signOut };
};

export default useAuth;
