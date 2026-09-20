import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3335,
    // The agent runs in the Go engine. Proxying keeps the browser on one origin
    // so there is no CORS configuration to get wrong in a demo.
    proxy: {'/v1': {target: 'http://127.0.0.1:8080', changeOrigin: true}},
  },
})
