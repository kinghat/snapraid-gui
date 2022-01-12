import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    hasServerConnection: false,
    isSetup: false,
    isAuthorized: false,
  }),
  actions: {
    async authorize() {
      await fetch("http://localhost:8080/api/auth/authorize", {
        method: "POST",
        credentials: "include",
      })
        .then(async (response) => {
          const data = await response.json();

          // console.log("leData:\n", data);
          // console.log("leResponse.ok: ", response.ok);

          if (response) this.isAuthorized = response.status === 202;

          this.hasServerConnection = true;

          console.log(
            "storeState:",
            "\nhasServerConnection: ",
            this.hasServerConnection,
            "\nisAuthorized: ",
            this.isAuthorized,
          );
          return;
        })
        .catch((error) => {
          // if (error instanceof Error) {
          //   console.log("instanceOfIsAuthorizedCatch:\n", error);
          //   return { error };
          // }
          // await error.json();
          this.hasServerConnection = false;
          console.log(
            "storeCatch.hasServerConnection: ",
            this.hasServerConnection,
          );
          // console.log("isAuthorizedCatch:\n", error);
        });

      // return isAuthorized;
    },
  },
});
