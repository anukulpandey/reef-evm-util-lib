import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReefEvmUtilLib",
      fileName: (format) => `evm-util-lib.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [dts()],
});
