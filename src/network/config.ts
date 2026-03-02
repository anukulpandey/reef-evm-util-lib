import { NetworkType, type NetworkConfig } from '../types/network';

export const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig> = {
    [NetworkType.ReefMainnet]: {
        name:"reef-mainnet",
        substrateWsRpcUrl: 'ws://reeftestnet1-reefethrpc-dab87f-72-60-35-83.traefik.me:9944',
        substrateRpcUrl: 'http://reeftestnet1-reefethrpc-dab87f-72-60-35-83.traefik.me:9944',
        evmRpcUrl: 'http://reeftestnet1-reefethrpc-dab87f-72-60-35-83.traefik.me',
        blockExplorerUrl: 'http://136.111.64.14:4001/',
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
        blockExplorerUrl: 'http://localhost:4000/',
    }
};