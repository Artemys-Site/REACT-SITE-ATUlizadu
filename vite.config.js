import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apiartemys20251205182055-ffh8dzf7auf2hrdp.centralus-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
