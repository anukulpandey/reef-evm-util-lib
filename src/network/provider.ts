import { ApiPromise, WsProvider } from "@polkadot/api";
import type { Provider } from "../types/provider";

export const initProvider = async (providerUrl: string) => {
    const wsProvider = new WsProvider(providerUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    const provider = wsProvider as Provider;
    provider.api = api;
    return provider;
}