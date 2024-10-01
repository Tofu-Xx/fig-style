import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'fig-style',
      fileName: format => `main.${format}.js`,
    },
  },
})
