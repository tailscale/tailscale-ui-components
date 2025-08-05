import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import paths from "vite-tsconfig-paths"


export default defineConfig({
  plugins: [paths(), react(), svgr()],
  publicDir: 'src/assets',
})
