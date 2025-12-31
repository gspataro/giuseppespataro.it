import { defineConfig } from "vite";
import * as path from 'path';
import tailwindcss from "@tailwindcss/vite";
import { exec } from 'child_process';

export default defineConfig({
    base: '/assets/',
    build: {
        outDir: path.resolve(__dirname, 'public/assets'),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: [
                path.resolve(__dirname, 'resources/assets/css/app.css'),
                path.resolve(__dirname, 'resources/assets/js/app.js')
            ],
            output: {
                entryFileNames: `[name]-[hash].js`,
                chunkFileNames: `[name]-[hash].js`,
                assetFileNames: `[name]-[hash].[ext]`,
            }
        }
    },
    plugins: [
        tailwindcss(),
        solista()
    ]
});

function solista() {
    return {
        name: 'solista-run-build',
        closeBundle() {
            exec('php solista build --view-only', (err, stdout, stderr) => {
                if (!process.argv.includes('--watch')) {
                    return;
                }

                if (err) {
                    console.error(`Build error: ${err.message}`);
                }

                if (stderr) {
                    console.error(`stderr: ${err}`);
                }

                console.log(`stdout: ${stdout}`);
            });
        }
    };
}
