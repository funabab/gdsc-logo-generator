import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // HACK FIX: for yoga-prebuilt issue with satori
  // https://github.com/vercel/satori/issues/185#issuecomment-1278264083
  define: {
    _a: 'undefined',
  },
})
