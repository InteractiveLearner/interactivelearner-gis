import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@didyoumeantoast/dash-components/dist/dash-components/assets",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    outDir: "build",
  },
});
