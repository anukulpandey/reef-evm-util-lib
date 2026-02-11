import axios from "axios";
import { getNetwork } from "../reefState/network";
import type { SmartContract, SmartContractsResponse } from "../types/contracts";

export const getAllContracts = async (
  query?: string
): Promise<SmartContract[]> => {
  const blockExplorerUrl = getNetwork().blockExplorerUrl;
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

export const getVerifiedContract = async (
  address: string
): Promise<any> => {
  const blockExplorerUrl = getNetwork().blockExplorerUrl;
  const requestUrl = `${blockExplorerUrl}/api/v2/smart-contracts/${address}`;

  try {
    const res = await axios.get<any>(requestUrl, {
      headers: { accept: "application/json" },
    });

    return res.data.items;
  } catch (error: any) {
    console.error("❌ Error fetching verified smart contracts:", error.message || error);
    throw error;
  }
};
