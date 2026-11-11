import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  // Root-hosted Vercel deployments use /. GitHub Pages can opt into its repo subpath.
  base: mode === 'github-pages' ? '/cleanairbr/' : '/',
}));
