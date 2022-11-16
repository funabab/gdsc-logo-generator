import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'fonts/**/*.ttf', 'images/**/*.{svg,png}'],
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['*.{css,html,js,ttf,png,svg,jpg}'],
      },
      manifest: {
        theme_color: '#2d3748',
        name: 'Community Logo Generator',
        short_name: 'GDSCLogoGenerator',
        background_color: '#2d3748',
        description:
          'Community image generator fot Google Developer Student Clubs (GDSC), Google Developer Groups (GDG) and Women Techmakers (WTM)',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
