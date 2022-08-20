import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'assets/android-chrome-192x192.png',
        'assets/android-chrome-512x512.png',
        'assets/apple-touch-icon.png',
        'assets/favicon-16x16.png',
        'assets/favicon-32x32.png',
        'assets/favicon.ico',
        'assets/mask-icon.svg',
      ],
      manifest: {
        name: 'Unit Conversion',
        short_name: 'UnitConversion',
        description: 'Converting metric to imperial and getting weight percentages',
        theme_color: '#663399',
        icons: [
          { src: 'assets/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
          { src: 'assets/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
