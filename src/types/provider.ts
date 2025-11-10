import type { ApiPromise, WsProvider } from "@polkadot/api";

export interface Provider extends WsProvider{
    api:ApiPromise;
}