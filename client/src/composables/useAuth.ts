import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";

const useAuth = () => {
  const router = useRouter();

  const isAuthorized = async () => {
    const mainStore = useMainStore();
    let isAuthorized = false;
    const response = await fetch("http://localhost:8080/api/auth/authorize", {
      method: "POST",
      credentials: "include",
    });

    response.status === 202 ? (isAuthorized = true) : (isAuthorized = false);

    mainStore.isAuthorized = isAuthorized;

    return isAuthorized;
  };
  const signOut = () => {
    const { onFetchResponse, onFetchError, error, data, statusCode } = useFetch(
      "http://localhost:8080/api/auth/signout",
      {
        credentials: "include",
      },
    ).post();

    onFetchResponse((response) => {
      console.log(`response.status: ${response.status}`);

      router.push("/signin");
    });

    onFetchError((error) => {
      console.log(`error: ${error}`);

      router.push("/signin");
    });
  };

  return { isAuthorized, signOut };
};

export default useAuth;
