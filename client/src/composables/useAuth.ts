import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";

const useAuth = () => {
  const isAuthorized = async () => {
    let isAuthorized = false;
    const mainStore = useMainStore();

    await fetch("http://localhost:8080/api/auth/authorize", {
      method: "POST",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        console.log("leData:\n", data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          // const error = (data && data.message) || response.statusText;
          // return Promise.reject(error);
          console.log("leResponse: ", response);
          // await response.json().then((json) => {
          //   console.log("leJson", json);

          //   throw json;
          // });
        }
        if (response) isAuthorized = response.status === 202;
      })
      .catch((error) => {
        // if (error instanceof Error) {
        //   console.log("instanceOfIsAuthorizedCatch:\n", error);
        //   return { error };
        // }
        // await error.json();
        console.log("isAuthorizedCatch:\n", error);
      });
    // try {
    //   const response = await fetch("http://localhost:8080/api/auth/authorize", {
    //     method: "POST",
    //     credentials: "include",
    //   });

    //   if (response) isAuthorized = response.status === 202;
    // } catch (error) {
    //   console.log(error);
    // }

    mainStore.isAuthorized = isAuthorized;
    console.log("isAuthorized: ", isAuthorized);

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
