import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import path from "path";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "/src"),
//     },
//   },
// });

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias:
//       //[
//       //   { find: "@", replacement: "/src" },
//       //   // { find: 'views', replacement: '/src/views' },
//       //   // { find: 'components', replacement: '/src/components' },
//       // ],
//       {
//         "@": "/src",
//       },
//   },
// });
