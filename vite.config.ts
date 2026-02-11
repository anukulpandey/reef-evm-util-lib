import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReefEvmUtilLib",
      fileName: "reef-evm-util-lib",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "@polkadot/api",
        "@polkadot/types",
        "@polkadot/types/types",
        "@polkadot/util",
        "@polkadot/util-crypto",
        "@reef-chain/evm-provider",
        "axios",
        "ethers",
        "pusher-js",
        "rxjs",
      ],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
