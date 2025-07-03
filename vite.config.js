import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        works: resolve(__dirname, 'Works.html'),
        contact: resolve(__dirname, 'links_and_sources.html'),
      }
    }
  }
})
