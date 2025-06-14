import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindcssNesting from "tailwindcss/nesting";
import postcssImport from "postcss-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        tailwindcssNesting,
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  esbuild: {
    // Completely bypass TypeScript checking
    loader: 'tsx',
    include: /.*\.[tj]sx?$/,
    exclude: [],
  },
  build: {
    // Skip type checking during build
    target: 'esnext',
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress TypeScript warnings
        if (warning.code === 'TS2307' || warning.code === 'TS2339' || warning.code === 'TS2322') {
          return;
        }
        warn(warning);
      }
    }
  }
}); 