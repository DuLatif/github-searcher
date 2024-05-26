import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

const viteConfig = {
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
          "@import 'src/themes/colors.scss';@import 'src/themes/spacing.scss';@import 'src/themes/breakpoints.scss';@import 'src/themes/typography.scss';@import 'src/themes/animations.scss';",
      },
    },
  },
};

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      // @ts-ignore
      coverage: {
        reporter: ["text", "html-spa"],
        reportsDirectory: "./test/unit/coverage",
      },
    },
  })
);
