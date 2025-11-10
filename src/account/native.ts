import { reefState } from "..";

export const getBalance = async (address: string): Promise<string> => {
  const provider = reefState.getProvider();
  const accountInfo = await provider.api.query.system.account(address);
  const balance = (accountInfo as any).data.free.toString();
  return balance;
};
