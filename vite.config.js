import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  allowJs:true,
  plugins: [react()],
  server: { port: 3300 },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
