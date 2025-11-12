import axios from "axios";
import { reefState } from "..";
import type { ReefHolder, ReefHoldersResponse } from "../types/evm";

export const getReefHolders = async (): Promise<ReefHolder[]> => {
  const allHolders: ReefHolder[] = [];
  const blockExplorerUrl = reefState.getNetwork().blockExplorerUrl;
  let requestUrl = `${blockExplorerUrl}/api/v2/addresses`;
  let nextParams: Record<string, any> | null = null;

  try {
    while (true) {
      const res :any = await axios.get<ReefHoldersResponse>(requestUrl, {
        params: nextParams || {},
        headers: { accept: "application/json" },
      });

      const data = res.data;
      if (data.items && data.items.length > 0) {
        allHolders.push(...data.items);
      }

      if (!data.next_page_params) break;
      nextParams = data.next_page_params;
    }

    return allHolders;
  } catch (error: any) {
    console.error("❌ Error fetching reef holders:", error.message || error);
    throw error;
  }
};
