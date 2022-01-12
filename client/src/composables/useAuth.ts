import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";

const useAuth = () => {
  // const isAuthorized = async () => {
  //   let isAuthorized = false;
  //   let { hasServerConnection } = storeToRefs(useMainStore());

  //   await fetch("http://localhost:8080/api/auth/authorize", {
  //     method: "POST",
  //     credentials: "include",
  //   })
  //     .then(async (response) => {
  //       const data = await response.json();
  //       console.log("leData:\n", data);

  //       // check for error response
  //       if (!response.ok) {
  //         console.log("leResponse: ", response);
  //       }
  //       if (response) isAuthorized = response.status === 202;
  //       hasServerConnection.value = true;
  //     })
  //     .catch((error) => {
  //       // if (error instanceof Error) {
  //       //   console.log("instanceOfIsAuthorizedCatch:\n", error);
  //       //   return { error };
  //       // }
  //       // await error.json();
  //       hasServerConnection.value = false;
  //       console.log("catch hasServerConnection: ", hasServerConnection);
  //       // console.log("isAuthorizedCatch:\n", error);
  //     });
  //   // isAuthorized = isAuthorized;

  //   return isAuthorized;
  // };
  const signOut = async () => {
    const router = useRouter();

    const response = await fetch("http://localhost:8080/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    response.status === 200 ? router.push("/signin") : router.push("/signin");
  };

  return { signOut };
  // return { isAuthorized, signOut };
};

export default useAuth;
