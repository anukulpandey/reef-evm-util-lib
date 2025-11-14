import { describe, test, expect, beforeAll } from "vitest";
import { ethers } from "ethers";
import Storage from "./utils/contracts/Storage.json";
import {Provider} from "@reef-chain/evm-provider";
import { network, reefState, signers } from "../src";
import { WsProvider } from "@polkadot/api";

describe("Smart Contract tests", () => {
  let provider: ethers.JsonRpcProvider;
  let signer: ethers.Wallet;
  let mnemonics: string;

  beforeAll(async () => {
    mnemonics = "judge box bless much media say shrug crunch gun scorpion afraid object";
    provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const PRIVATE_KEY =
      "0a0620b19bdc499ca0e7ee9d7202fcab41e2d93b142ca12df905c9653c2235f1";
    signer = new ethers.Wallet(PRIVATE_KEY, provider);
  });

  test("should retrieve stored number from Storage Contract using ETH RPC", async () => {
    const contractAddress = Storage.address;
    const abi = Storage.abi;

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const value = await contract.retrieve();

    console.log("Retrieved value:", value.toString());

    expect(value).toBeDefined();
  });

  test("should retrieve stored number from Storage Contract using SUBSTRATE RPC", async () => {
    const contractAddress = Storage.address;
    const abi = Storage.abi;

    const providerNative = new Provider({
        provider:new WsProvider(network.config.NETWORK_CONFIGS.localhost.substrateWsRpcUrl)
    });

    await providerNative.api.isReadyOrError;

    const contract = new ethers.Contract(contractAddress, abi, providerNative as any);
    const value = await contract.retrieve();

    console.log("Retrieved value:", value.toString());

    expect(value).toBeDefined();
  });
});
