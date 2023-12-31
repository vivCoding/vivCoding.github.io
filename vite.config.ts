import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  base: "./",
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
