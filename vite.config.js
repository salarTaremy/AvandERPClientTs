import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  allowJs: true,
  plugins: [react()],
  server: { port: 3300 },
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  // build: {
  //   chunkSizeWarningLimit: 1024,
  // },

  build: {
    chunkSizeWarningLimit: 1024, //kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }

})
