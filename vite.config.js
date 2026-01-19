import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change 'portfolio' to your actual repository name
  base: '/portfolio/', 
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
})
