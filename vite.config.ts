import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:'0.0.0.0',
    port: 6666,
    allowedHosts: ['moving-0yu1.onrender.com'],
  
  }
})



