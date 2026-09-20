import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333,
    // The engine runs as a separate process. Proxying keeps the browser on one
    // origin, so there is no CORS configuration to get wrong and no credential
    // travelling cross-site.
    proxy: {'/api': {target: 'http://127.0.0.1:8080', changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '')}},
  },
})
