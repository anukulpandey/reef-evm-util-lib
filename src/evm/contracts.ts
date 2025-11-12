import axios from "axios";
import { reefState } from "..";
import type { SmartContract, SmartContractsResponse } from "../types/sc";

export const getVerifiedSmartContracts = async (
  query?: string
): Promise<SmartContract[]> => {
  const blockExplorerUrl = reefState.getNetwork().blockExplorerUrl;
  const requestUrl = `${blockExplorerUrl}/api/v2/smart-contracts`;

  try {
    const res = await axios.get<SmartContractsResponse>(requestUrl, {
      params: {
        ...(query ? { q: query } : {}),
        filter: "solidity",
      },
      headers: { accept: "application/json" },
    });

    return res.data.items;
  } catch (error: any) {
    console.error("❌ Error fetching verified smart contracts:", error.message || error);
    throw error;
  }
};
