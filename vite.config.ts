import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupTests.ts',
    reporters: ['default', 'html'],
    coverage: {
      provider : 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
      all: true,
      enabled : true
    },
  },
})
