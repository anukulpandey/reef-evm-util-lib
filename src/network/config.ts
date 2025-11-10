import { NetworkType, type NetworkConfig } from '../types/network';

export const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig> = {
    [NetworkType.ReefMainnet]: {
        name:"reef-mainnet",
        substrateWsRpcUrl: 'ws://34.123.142.246:9944',
        substrateRpcUrl: 'http://34.123.142.246:9944',
        evmRpcUrl: 'http://34.123.142.246:8545',
        blockExplorerUrl: 'https://testnet.reefscan.com',
    },
    [NetworkType.ReefTestnet]: {
        name:"reef-testnet",
        substrateWsRpcUrl: 'wss://rpc-testnet.reefscan.com/ws',
        substrateRpcUrl: 'https://rpc-testnet.reefscan.com',
        evmRpcUrl: 'https://evm-testnet.reefscan.com',
        blockExplorerUrl: 'https://testnet.reefscan.com',
    },
    [NetworkType.ReefLocalhost]: {
        name:"localhost",
        substrateWsRpcUrl:"ws://localhost:9944",
        substrateRpcUrl: 'http://localhost:9944',
        evmRpcUrl: 'http://localhost:8545',
        blockExplorerUrl: 'http://localhost',
    }
};