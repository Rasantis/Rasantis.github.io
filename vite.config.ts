import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset URLs relative, so the build works both on
// https://rasantis.github.io and when opened from the filesystem.
export default defineConfig({
  plugins: [react()],
  base: './',
});
