import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "fig-style",
    },
    // rollupOptions: {
    //   external:['vue'],
    //   output: {
    //     globals: {
    //       fig: "fig",
    //     },
    //   },
    // },
  },
});
