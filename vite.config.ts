import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  base: "./",
  publicDir: false,
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // preserve filenames, tho tbh not rly needed
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  preview: {
    port: 3000,
  },
})
