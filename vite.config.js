import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base './' y un solo archivo: dist/index.html se abre con doble clic, sin servidor
export default defineConfig({
  base: './',
  build: { outDir: 'docs' },
  plugins: [react(), viteSingleFile()],
});
