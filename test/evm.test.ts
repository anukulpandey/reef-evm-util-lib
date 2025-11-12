import { describe, test, expect, beforeAll } from "vitest";
import { network, account, reefState, evm } from "../src/index";
import { Keyring } from "@polkadot/api";

describe("EVM tests", () => {
    const blockNumber = "11456971";
    let blockHash = ""; // will update this after fetching blockInfo

    //init reef state ( network , provider )
    beforeAll(
        async () => {
            await reefState.initReefState(network.config.NETWORK_CONFIGS.mainnet);
        },
    );

    test(
        "should fetch transaction info from hash",
        async () => {
            const txHash = "0x0578e8e8d57bd4258d377a7ed496e7bbd6eb0341dc492893b45b1353b81032af";
            const txInfo = await evm.tx.getTransactionInfo(txHash);
            expect(txInfo.hash).toBe(txHash);
        },
    );

    test(
        "should fetch block info from number",
        async () => {
            const blockInfo = await evm.blocks.getBlockInfo(blockNumber);
            blockHash = blockInfo.hash;
            expect(blockInfo.height).toBe(parseInt(blockNumber));
        },
    );

    test(
        "should fetch block info from hash",
        async () => {
            const blockInfo = await evm.blocks.getBlockInfo(blockHash);
            let fetchedBlockNo = blockInfo.height??(blockInfo as any).items[0].height;
            expect(fetchedBlockNo).toBeDefined();
        },
    );

    test(
        "should fetch reef token holders",
        async () => {
            const reefTokenHolders = await evm.addresses.getReefHolders();
            expect(reefTokenHolders.length).toBeGreaterThan(0);
        },
    );

    test(
        "should fetch tokens all kind of tokens",
        async () => {
            const tokens = await evm.tokens.getTokens("",["ERC-20", "ERC-721", "ERC-1155"]);
            expect(tokens.length).toBeGreaterThan(0);
        },
    );

    test(
        "should fetch all ERC-1155 tokens",
        async () => {
            const tokens = await evm.tokens.getTokens("",["ERC-1155"]);
            // as testnet has no ERC-1155 tokens , expect 0
            expect(tokens.length).toBe(0);
        },
    );

    test(
        "should fetch all ERC-721 tokens",
        async () => {
            const tokens = await evm.tokens.getTokens("",["ERC-721"]);
            // as testnet has no ERC-721 tokens , expect 0
            expect(tokens.length).toBe(0);
        },
    );
   
    test(
        "should fetch token transfers for WETH",
        async () => {
            const transfers = await evm.tokens.getTokenTransfers("0x057a1Ac4e0BB9ef2a26E214F380F69AECeC7E3F0");
            expect(transfers.length).toBeGreaterThan(0);
        },
    );
   
   
    test(
        "should fetch token holders for WETH",
        async () => {
            const wethHolders = await evm.addresses.getTokenHolders("0x057a1Ac4e0BB9ef2a26E214F380F69AECeC7E3F0");
            expect(wethHolders.length).toBeGreaterThan(0);
        },
    );


});
