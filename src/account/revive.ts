import type { ApiPromise } from "@polkadot/api";
import { ethers } from "ethers";
import { getNetwork } from "../reefState/initReefState";

export const getNativeAddress = async (
  api: ApiPromise,
  reviveEvmAddress: string
): Promise<string> => {
  return (await api.query.revive.originalAccount(reviveEvmAddress)).toString();
};

export async function ethGetBalance(reviveEvmAddress: string): Promise<string> {
  const selectedNetwork = getNetwork();
  const provider = new ethers.JsonRpcProvider(selectedNetwork.evmRpcUrl);

  const balance = await provider.getBalance(reviveEvmAddress);
  return balance.toString();
}
