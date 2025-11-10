import { BehaviorSubject } from "rxjs";
import type { NetworkConfig } from "../types/network";

export const network$ = new BehaviorSubject<NetworkConfig | null>(null);

export function getNetwork(): NetworkConfig {
    const network = network$.getValue();
    if (!network) throw new Error("Network not initialized. Call initReefState first.");
    return network;
  }
  