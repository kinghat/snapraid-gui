import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
    // alias: [
    //   { find: "@", replacement: "/src" },
    //   // { find: "views", replacement: "/src/views" },
    //   // { find: "components", replacement: "/src/components" },
    // ],
  },
});
