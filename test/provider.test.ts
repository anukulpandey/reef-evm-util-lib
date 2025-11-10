import { describe, test, expect, afterAll } from "vitest";
import { network } from "../src/index";

describe("Provider tests", () => {
  let provider: Awaited<ReturnType<typeof network.provider.initProvider>>;

  test(
    "should init the provider",
    async () => {
      provider = await network.provider.initProvider(
        network.config.NETWORK_CONFIGS.localhost.substrateWsRpcUrl
      );
      expect(provider.api).toBeDefined();
      expect(provider.api.isConnected).toBeTruthy();
    },
  );

  test(
    "should fetch the latest block",
    async () => {
      const header = await provider.api.rpc.chain.getHeader();
      const blockNumber = header.number.toNumber();
      const blockHash = header.hash.toHex();

      console.log(`📦 Latest block number: ${blockNumber}`);
      console.log(`🔗 Block hash: ${blockHash}`);

      expect(blockNumber).toBeGreaterThan(0);
      expect(blockHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
    },
  );

  afterAll(async () => {
    await provider.api.disconnect();
  });
});
