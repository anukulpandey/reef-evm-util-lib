export interface NetworkConfig{
    name:string;
    substrateWsRpcUrl:string;
    substrateRpcUrl:string;
    evmRpcUrl:string;
    blockExplorerUrl:string;
}

export const NetworkType = {
    ReefMainnet: "mainnet",
    ReefTestnet: "testnet",
    ReefLocalhost: "localhost",
} as const;

export type NetworkType = (typeof NetworkType)[keyof typeof NetworkType];