import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => ['radix-connect-button'].includes(tag),
            }
        }
    })],
    server: {
        proxy: {
        },
        port: 5100
    },
    build: {
        minify: 'esbuild'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
