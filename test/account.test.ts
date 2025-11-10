import { describe, test, expect, afterAll, beforeAll } from "vitest";
import { network,account } from "../src/index";
import { getProvider, initReefState } from "../src/reefState/initReefState";

describe("Account tests", () => {
  let provider: Awaited<ReturnType<typeof network.provider.initProvider>>;

  //init provider
  beforeAll(
    async () => {
      await initReefState(network.config.NETWORK_CONFIGS.localhost);
      provider = getProvider();
    },
  );

  test(
    "should fetch native address from revive mapping",
    async () => {
        const reviveAddress = "0x9621dde636de098b43efb0fa9b61facfe328f99d";
        const nativeAddress = await account.revivePallet.getNativeAddress(provider.api,reviveAddress);
        expect(nativeAddress.length).toBeGreaterThan(0);
    },
  );

  test(
    "should log the balance of revive evm address",
    async () => {
        const reviveAddress = "0x9621dde636de098b43efb0fa9b61facfe328f99d";
        const balance = await account.revivePallet.ethGetBalance(reviveAddress);
        expect(balance).toBeDefined();
    },
  );

  afterAll(async () => {
    await provider.api.disconnect();
  });
});
