import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Pasta de saída
    assetsDir: 'assets'  // Subpasta para assets
  },
  base: '/', // Define o caminho base para o deploy

  // Resolve para facilitar importações
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
