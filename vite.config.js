import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    customLogger: {
        warn(msg, options) {
            // Filter warning deprecation dari internal plugin react babel di Vite 8
            if (msg.includes('esbuild') || msg.includes('rollupOptions') || msg.includes('@vitejs/plugin-react-oxc')) {
                return;
            }
            console.warn(msg, options);
        },
        info(msg, options) {
            console.info(msg, options);
        },
        error(msg, options) {
            console.error(msg, options);
        },
        clearScreen() {},
        hasErrorLogged() {
            return false;
        },
        hasWarned: false,
    },
});
