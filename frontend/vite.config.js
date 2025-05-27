import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Pasta de saída
    assetsDir: 'assets'  // Subpasta para assets
  },
  base: '/', // Define o caminho base para o deploy
  server: {
    port: 5173,
    host: true, // Expose to all network interfaces
    watch: {
      usePolling: true, // Enable polling for file changes
    },
  },
  // Resolve para facilitar importações
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
