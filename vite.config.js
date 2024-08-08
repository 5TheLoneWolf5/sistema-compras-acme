// import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const root = resolve(__dirname, "src");
// const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  // root,
  plugins: [react()],
  build: {
    // outDir,
    // emptyOutDir: true,
    // main: resolve(root, "index.html"),
    // api: resolve(root, "api", "index.html"),
    rollupOptions: {
      input: {
        main: "index.html",
        api: "api.html",
      }
    }
  }
})
