import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'fig',
      fileName: format => `main.${format}.js`,
    },
  },
})
