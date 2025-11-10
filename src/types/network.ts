export interface NetworkConfig{
    name:string;
    substrateWsRpcUrl:string;
    substrateRpcUrl:string;
    evmRpcUrl:string;
    blockExplorerUrl:string;
}

export enum NetworkType {
    ReefMainnet = "mainnet",
    ReefTestnet = "testnet",
    ReefLocalhost = "localhost",
}