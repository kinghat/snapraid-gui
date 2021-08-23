import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  // a function that returns a fresh state
  state() {
    return {
      counter: 0,
      name: "Eduardo",
    };
  },
  // optional getters
  getters: {
    // doubleCount() {
    //   return this.counter * 2;
    // },
    // // use getters in other getters
    // doubleCountPlusOne() {
    //   return this.doubleCount * 2 + 1;
    // },
  },
  // optional actions
  actions: {
    // reset() {
    //   // `this` is the store instance
    //   this.counter = 0;
    // },
  },
});
