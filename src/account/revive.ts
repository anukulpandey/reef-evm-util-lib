import { ethers } from "ethers";
import { reefState } from "..";
import type { Provider } from "../types/provider";

export const getNativeAddress = async (
  reviveEvmAddress: string
): Promise<string> => {
    const provider:Provider = reefState.getProvider();
  return (await provider.api.query.revive.originalAccount(reviveEvmAddress)).toString();
};

export async function ethGetBalance(reviveEvmAddress: string): Promise<string> {
  const selectedNetwork = reefState.getNetwork();
  const provider = new ethers.JsonRpcProvider(selectedNetwork.evmRpcUrl);

  const balance = await provider.getBalance(reviveEvmAddress);
  return balance.toString();
}
