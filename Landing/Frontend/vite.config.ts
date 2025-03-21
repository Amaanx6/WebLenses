import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        bookmarklet: './src/bookmarklet.jsx'
      },
      output: {
        entryFileNames: '[name].js',
        format: 'iife'
      }
    }
  }
})