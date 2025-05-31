import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    port: 5173,
    // Enable for local network testing
    host: true,
  },
  preview: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Recommended for production debugging
    chunkSizeWarningLimit: 1600, // Adjust based on your needs
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          react: ['react', 'react-dom'],
          icons: ['@heroicons/react', 'react-icons'],
          vendor: ['axios']
        }
      }
    }
  },
  // Vercel-specific optimizations
  base: '/', // Ensure correct base path
  optimizeDeps: {
    include: ['react', 'react-dom', 'tailwindcss'] // Pre-bundle dependencies
  }
});