import { describe, test, expect, beforeAll } from "vitest";
import { network,account,reefState } from "../src/index";
import { Keyring } from "@polkadot/api";

describe("Account tests", () => {
  //init reef state ( network , provider )
  beforeAll(
    async () => {
      await reefState.initReefState(network.config.NETWORK_CONFIGS.localhost);
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
    "should fetch the balance from revive evm address",
    async () => {
        const reviveAddress = "0x9621dde636de098b43efb0fa9b61facfe328f99d";
        const balance = await account.revivePallet.getBalance(reviveAddress);
        console.log("💵 Revive Balance:", balance);
        expect(balance).toBeDefined();
    },
  );

  test(
    "should fetch the balance from native address",
    async () => {
        const nativeAddress = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
        const balance = await account.nativePallet.getBalance(nativeAddress);
        console.log("💵 Native Balance:", balance);
        expect(balance).toBeDefined();
    },
   
  );

  test(
    "should bridge tokens from native to evm revive",
    {timeout:20000},
    async () => {
        const keyring = new Keyring({ type: "sr25519" });
        const alice = keyring.addFromUri("//Alice");
        const tx = await account.nativePallet.sendToReviveEvmAddress(alice,"0x051c64f41fabdb6ee74767ff0390cd52a0749d56");
        console.log("🔗 Bridge Tx Hash:", tx);
    },
    
  );
});
