import { reactive, ref } from "vue";
import { useFetch } from "@vueuse/core";

const useAuth = () => {
  const isAuthorized = async () => {
    let isAuthorized = false;
    const response = await fetch("http://localhost:8080/api/auth/authorize", {
      method: "POST",
      credentials: "include",
    });

    response.status === 202 ? (isAuthorized = true) : (isAuthorized = false);

    return isAuthorized;
  };

  return { isAuthorized };
};

export default useAuth;
