import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          "@import 'src/themes/colors.scss';@import 'src/themes/spacing.scss';@import 'src/themes/breakpoints.scss';@import 'src/themes/typography.scss';",
      },
    },
  },
});
