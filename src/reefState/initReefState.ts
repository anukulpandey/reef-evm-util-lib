import { BehaviorSubject, combineLatest } from "rxjs";
import type { Provider } from "../types/provider";
import type { NetworkConfig } from "../types/network";
import { initProvider } from "../network/provider";

export const provider$ = new BehaviorSubject<Provider | null>(null);
export const network$ = new BehaviorSubject<NetworkConfig | null>(null);

export const reefState$ = combineLatest([provider$, network$]);

export async function initReefState(network: NetworkConfig) {
  const provider = await initProvider(network.substrateWsRpcUrl);
  network$.next(network);
  provider$.next(provider);
  console.log(`✅ Reef initialized for ${network.name || "unknown"}`);
  return { provider, network };
}

export function getProvider(): Provider {
  const provider = provider$.getValue();
  if (!provider) throw new Error("Provider not initialized. Call initReefState first.");
  return provider;
}

export function getNetwork(): NetworkConfig {
  const network = network$.getValue();
  if (!network) throw new Error("Network not initialized. Call initReefState first.");
  return network;
}
