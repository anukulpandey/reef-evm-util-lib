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

   



});
