import type { ApiPromise } from "@polkadot/api";
import axios from "axios";
import { getNetwork } from "../reefState/initReefState";

export const getNativeAddress = async (api: ApiPromise, reviveEvmAddress: string): Promise<string> => {
    return (await api.query.revive.originalAccount(reviveEvmAddress)).toString();
}

export async function ethGetBalance(reviveEvmAddress: string) {
    const selectedNetwork = getNetwork();
    const res = await axios.post(selectedNetwork.evmRpcUrl, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [reviveEvmAddress, "latest"],
        id: 1,
    }, {
        headers: { "Content-Type": "application/json" },
    });

    const data = res.data;
    if (data.error) throw new Error(JSON.stringify(data.error));
    return BigInt(data.result);
}
