import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // The site is served from the domain root (custom domain), so base is "/".
  base: '/',
  server: {
    // Force IPv4 localhost to avoid "::1 only" binding issues on some setups.
    host: '127.0.0.1',
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
