import { reefState } from "..";
import { decodeAddress, keccakAsHex } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";

export const getBalance = async (address: string): Promise<string> => {
  const provider = reefState.getProvider();
  const accountInfo = await provider.api.query.system.account(address);
  const balance = (accountInfo as any).data.free.toString();
  return balance;
};

export const getReviveEvmAddress = async (address: string): Promise<string> => {
    const pubKey = decodeAddress(address);
    const evmAddress = "0x" + keccakAsHex(u8aToHex(pubKey)).slice(26);
    return evmAddress;
};