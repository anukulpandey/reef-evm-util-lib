import type { ApiPromise } from "@polkadot/api";

export const getNativeAddress=async(api: ApiPromise ,reviveEvmAddress:string):Promise<string>=>{
    return (await api.query.revive.originalAccount(reviveEvmAddress)).toString();
}