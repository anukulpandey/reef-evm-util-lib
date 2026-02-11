import axios from "axios";
import { getNetwork } from "../reefState/network";
import type { Token, TokensResponse, TokenTransfer, TokenTransfersResponse, TokenType } from "../types/evm";

export const getTokens = async (
  query: string,
  types: TokenType[] = ["ERC-20", "ERC-721", "ERC-1155"]
): Promise<Token[]> => {
  const blockExplorerUrl = getNetwork().blockExplorerUrl;
  const requestUrl = `${blockExplorerUrl}/api/v2/tokens`;

  try {
    const res = await axios.get<TokensResponse>(requestUrl, {
      params: {
        q: query,
        type: types.join(","),
      },
      headers: { accept: "application/json" },
    });

    return res.data.items;
  } catch (error: any) {
    console.error("❌ Error fetching tokens:", error.message || error);
    throw error;
  }
};

export const getTokenTransfers = async (
  tokenAddress: string
): Promise<TokenTransfer[]> => {
  const allTransfers: TokenTransfer[] = [];
  const blockExplorerUrl = getNetwork().blockExplorerUrl;
  let requestUrl = `${blockExplorerUrl}/api/v2/tokens/${tokenAddress}/transfers`;
  let nextParams: Record<string, any> | null = null;

  try {
    while (true) {
      const res:any = await axios.get<TokenTransfersResponse>(requestUrl, {
        params: nextParams || {},
        headers: { accept: "application/json" },
      });

      const data = res.data;
      if (data.items && data.items.length > 0) {
        allTransfers.push(...data.items);
      }

      if (!data.next_page_params) break;
      nextParams = data.next_page_params;
    }

    return allTransfers;
  } catch (error: any) {
    console.error(`❌ Error fetching transfers for token ${tokenAddress}:`, error.message || error);
    throw error;
  }
};
