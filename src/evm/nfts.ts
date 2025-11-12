import { reefState } from "..";
import axios from "axios";

export const getNftsForUser = async (
    address: string
  ): Promise<any> => {
    const nfts: any[] = [];
    const blockExplorerUrl = reefState.getNetwork().blockExplorerUrl;
    let requestUrl = `${blockExplorerUrl}/api/v2/addresses/${address}/nft?type=ERC-721%2CERC-404%2CERC-1155`;
    let nextParams: Record<string, any> | null = null;
  
    try {
      while (true) {
        const res:any = await axios.get<any>(requestUrl, {
          params: nextParams || {},
          headers: { accept: "application/json" },
        });
  
        const data = res.data;
        if (data.items && data.items.length > 0) {
          nfts.push(...data.items);
        }
  
        if (!data.next_page_params) break;
        nextParams = data.next_page_params;
      }
  
      return nfts;
    } catch (error: any) {
      console.error(`❌ Error fetching NFTs for ${address}:`, error.message || error);
      throw error;
    }
  };
  