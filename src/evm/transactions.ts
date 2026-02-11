import axios from "axios";
import { getNetwork } from "../reefState/network";
import type { TransactionInfo } from "../types/evm";

export const getTransactionInfo = async (txHash: string): Promise<TransactionInfo> => {
  try {
    const blockExplorerUrl = getNetwork().blockExplorerUrl;
    const requestUrl = `${blockExplorerUrl}/api/v2/transactions/${txHash}`;

    const res = await axios.get(requestUrl, {
      headers: { accept: "application/json" },
    });

    return res.data;
  } catch (error: any) {
    console.error("❌ Error fetching transaction info:", error.message || error);
    throw error;
  }
};
