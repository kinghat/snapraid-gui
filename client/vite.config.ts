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
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      // "/": {
      //   target: "http://localhost:8080",
      //   changeOrigin: true,
      //   secure: false,
      //   bypass: (request, response) => {
      //     if (request.url.startsWith("/login")) return request.url;}
      // },
      // "^(?!/login)": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/login/, ""),
      // },
    },
  },
});
