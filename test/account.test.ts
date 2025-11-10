import { describe, test, expect, afterAll, beforeAll } from "vitest";
import { network,account } from "../src/index";
import { initReefState } from "../src/reefState/initReefState";

describe("Account tests", () => {
  //init reef state ( network , provider )
  beforeAll(
    async () => {
      await initReefState(network.config.NETWORK_CONFIGS.localhost);
    },
  );

  test(
    "should fetch native address from revive mapping",
    async () => {
        const reviveAddress = "0x9621dde636de098b43efb0fa9b61facfe328f99d";
        const nativeAddress = await account.revivePallet.getNativeAddress(reviveAddress);
        console.log("🏠 Native Address:", nativeAddress);
        expect(nativeAddress.length).toBeGreaterThan(0);
    },
  );

  test(
    "should log the balance of revive evm address",
    async () => {
        const reviveAddress = "0x9621dde636de098b43efb0fa9b61facfe328f99d";
        const balance = await account.revivePallet.ethGetBalance(reviveAddress);
        console.log("💵 Balance:", balance);
        expect(balance).toBeDefined();
    },
  );
});
