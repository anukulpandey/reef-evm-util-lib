import { ethers } from "ethers";
import { getProvider } from "../reefState/provider";
import { getNetwork } from "../reefState/network";
import type { Provider } from "../types/provider";

export const getNativeAddress = async (
  reviveEvmAddress: string
): Promise<string> => {
    const provider:Provider = getProvider();
  return (await provider.api.query.revive.originalAccount(reviveEvmAddress)).toString();
};

export async function getBalance(reviveEvmAddress: string): Promise<string> {
  const selectedNetwork = getNetwork();
  const provider = new ethers.JsonRpcProvider(selectedNetwork.evmRpcUrl);

  const balance = await provider.getBalance(reviveEvmAddress);
  return balance.toString();
}
