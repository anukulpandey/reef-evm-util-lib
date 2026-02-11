import axios from "axios";
import { getNetwork } from "../reefState/network";
import type { BlockInfo } from "../types/evm";

// fetches block info
export const getBlockInfo = async (hashOrBlockNo: string): Promise<BlockInfo> => {
  try {
    const blockExplorerUrl = getNetwork().blockExplorerUrl;
    const requestUrl = `${blockExplorerUrl}/api/v2/blocks/${hashOrBlockNo}`;

    const res = await axios.get(requestUrl, {
      headers: { accept: "application/json" },
    });

    return res.data;
  } catch (error: any) {
    console.error("❌ Error fetching block info:", error.message || error);
    throw error;
  }
};
