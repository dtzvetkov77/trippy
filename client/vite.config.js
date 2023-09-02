import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "https://trippy-server.onrender.com/api": {
        target: "http://localhost:5001",
        secure: false,
      },
    },
  },
  plugins: [react()],
});

