import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Update 'portfolio' to match your repository name
// If your repo is named 'portfolio', keep it as '/portfolio/'
// If your repo is your username.github.io, change to '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
})
