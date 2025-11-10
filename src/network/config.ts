import { NetworkType, type NetworkConfig } from '../types/network';

export const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig> = {
    [NetworkType.ReefMainnet]: {
        substrateWsRpcUrl: 'wss://rpc-testnet.reefscan.com/ws',
        substrateRpcUrl: 'https://rpc-testnet.reefscan.com',
        evmRpcUrl: 'https://evm-testnet.reefscan.com',
        blockExplorerUrl: 'https://testnet.reefscan.com',
    },
    [NetworkType.ReefTestnet]: {
        substrateWsRpcUrl: 'wss://rpc-testnet.reefscan.com/ws',
        substrateRpcUrl: 'https://rpc-testnet.reefscan.com',
        evmRpcUrl: 'https://evm-testnet.reefscan.com',
        blockExplorerUrl: 'https://testnet.reefscan.com',
    },
    [NetworkType.ReefLocalhost]: {
        substrateWsRpcUrl:"ws://localhost:9944",
        substrateRpcUrl: 'http://localhost:9944',
        evmRpcUrl: 'http://localhost:8545',
        blockExplorerUrl: 'http://localhost',
    }
};