import axios from "axios";
import { reefState } from "..";

export type TokenType = "ERC-20" | "ERC-721" | "ERC-1155";

export interface Token {
  address_hash: string;
  circulating_market_cap: string;
  decimals: string;
  exchange_rate: string | null;
  holders_count: string;
  icon_url: string | null;
  name: string;
  symbol: string;
  total_supply: string;
  type: TokenType;
  volume_24h: string;
}

export interface TokensResponse {
  items: Token[];
  next_page_params: Record<string, any> | null;
  total_count: number;
}

export const getTokens = async (
  query: string,
  types: TokenType[] = ["ERC-20", "ERC-721", "ERC-1155"]
): Promise<Token[]> => {
  const blockExplorerUrl = reefState.getNetwork().blockExplorerUrl;
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
