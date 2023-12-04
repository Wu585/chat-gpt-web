import path from "path"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    define: {
      isDev: command === "serve"
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
    server:{
      proxy:{
        '/api': {
          target: 'http://192.168.31.110:8000/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      }
    }
  }
})
