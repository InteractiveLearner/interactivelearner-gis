import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  template: {
    compilerOptions: {
      isCustomElement: (tag) =>
        tag.startsWith("arcgis-") ||
        tag.startsWith("calcite-") ||
        tag.startsWith("dash-"),
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "../node_modules/@didyoumeantoast/dash-components/dist/dash-components/assets",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    outDir: "build",
  },
});
