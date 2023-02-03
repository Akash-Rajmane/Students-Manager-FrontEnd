import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    viteCompression({ algorithm: "gzip" }),
    VitePWA({  
      registerType: 'prompt',  
      includeAssets: ['people.webp', 'people_maskable-192x192.png', 'people_maskable-512x512.png'],  
      manifest: {  
  name: 'Students Manager',  
        short_name: 'Students Manager',  
        description: 'Students Manager App used to effectively manage students. It is easy to use.',  
        theme_color: '#4bc00c',  
        start_url: '/',  
        icons: [  
  {  
  src: 'people_maskable-192x192.png',  
            sizes: '192x192',  
            type: 'image/png', 
            purpose: 'any maskable' 
          },  
          {  
  src: 'people-512x512.png',  
            sizes: '512x512',  
            type: 'image/png',  
          },  
          {  
  src: 'people-32x32.png',  
            sizes: '32x32',  
            type: 'image/png',  
          },  
          {  
  src: 'people-16x16.png',  
            sizes: '16x16',  
            type: 'image/png',  
          },  
          {  
  src: 'people_maskable-512x512.png',  
            sizes: '512x512',  
            type: 'image/png',  
            purpose: 'any maskable',  
          },  
        ],  
      },  
    }),  
  ],  
})
  

