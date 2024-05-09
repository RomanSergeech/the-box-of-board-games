/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [
		react(),
      splitVendorChunkPlugin()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@tests': path.resolve(__dirname, './tests'),
		},
	},
	build: {
      outDir: './dist',
		emptyOutDir: true,
      rollupOptions: {
         output:{
            manualChunks(id) {
               if (id.includes('node_modules')) {
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
               }
            }
         }
     }
	},
   server: {
      watch: {
         usePolling: true
      },
      host: true,
      strictPort: true,
      port: 3000
   }
})
