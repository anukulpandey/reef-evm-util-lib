import type { Account } from "./account";
import type { NetworkConfig } from "./network";
import type { Provider } from "./provider";

export interface ReefStateResponse{
    network:NetworkConfig;
    provider:Provider;
    accounts:Account[];
}