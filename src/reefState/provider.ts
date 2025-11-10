import { BehaviorSubject } from "rxjs";
import type { Provider } from "../types/provider";

export const provider$ = new BehaviorSubject<Provider | null>(null);

export function getProvider(): Provider {
  const provider = provider$.getValue();
  if (!provider) throw new Error("Provider not initialized. Call initReefState first.");
  return provider;
}