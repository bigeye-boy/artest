import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import Unocss from "unocss/vite";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("a-"),
        },
      },
    }),
    basicSsl(),
    Unocss(),
    Pages(),
  ],
  server: {
    https: true,
    host: "0.0.0.0",
    proxy: {
      // "/devapi": {
      //   target: "https://maps.googleapis.com",
      //   rewrite: (path) => path.replace(/^\/devapi/, ""),
      // },
      "/maps": {
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ""),
      },
    },
  },
});
