import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from external networks
    port: 5173, // Ensure it matches your logs
    strictPort: true, // Ensures the app uses the defined port
    allowedHosts: ['follow-along-project-milestone-2.onrender.com'], // Allow your Render domain
  }
})
