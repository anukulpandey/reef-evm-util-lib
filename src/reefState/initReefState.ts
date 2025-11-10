import { combineLatest } from "rxjs";
import type { NetworkConfig } from "../types/network";
import { initProvider } from "../network/provider";
import { provider$ } from "./provider";
import { network$ } from "./network";


export const reefState$ = combineLatest([provider$, network$]);

export async function initReefState(network: NetworkConfig) {
  const provider = await initProvider(network.substrateWsRpcUrl);
  network$.next(network);
  provider$.next(provider);
  console.log(`✅ Reef initialized for ${network.name || "unknown"}`);
  return { provider, network };
}
