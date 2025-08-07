import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import paths from "vite-tsconfig-paths"


export default defineConfig({
  plugins: [paths(), react(), svgr()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TailscaleUiComponents',
      fileName: 'tailscale-ui-components',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
})