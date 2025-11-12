# 🪸 @reef-chain/evm-util-lib

A TypeScript SDK providing unified utilities to interact with the **Reef Network** — combining **Substrate (Reef chain)** and **EVM-compatible** tooling for contracts, tokens, NFTs, accounts, and more.

---

## ⚙️ Installation

```bash
npm install @reef-chain/evm-util-lib
# or
yarn add @reef-chain/evm-util-lib
````

---

## 🚀 Quick Start

Before using any module, you must **initialize the Reef state** (network + provider):

```ts
import { reefState, network } from "@reef-chain/evm-util-lib";

await reefState.initReefState(network.config.NETWORK_CONFIGS.localhost);

console.log("✅ Reef initialized!");
```

This sets up:

* A connected Substrate `WsProvider`
* Global reactive state for provider and network
* Shared context for all EVM and Substrate utilities

---

<details>
<summary><h2>🧠 reefState module (Initialization)</h2></summary>

#### Imports

```ts
import { reefState } from "@reef-chain/evm-util-lib";
```

---

### 🔹 `initReefState(network: NetworkConfig): Promise<ReefStateResponse>`

Initializes the Reef provider and network context.
Must be called **before any other module**.

```ts
import { reefState, network } from "@reef-chain/evm-util-lib";

await reefState.initReefState(network.config.NETWORK_CONFIGS.localhost);
```

---

### 🔹 `getProvider(): Provider`

Returns the connected Substrate provider.

### 🔹 `getNetwork(): NetworkConfig`

Returns the currently selected network config.

Both throw an error if Reef hasn’t been initialized yet.

---

### 🔹 Reactive Streams

```ts
reefState.provider$.subscribe((p) => console.log("Provider ready:", p));
reefState.network$.subscribe((n) => console.log("Network switched:", n));
```

---

</details>

---

<details>
<summary><h2>🌐 network module</h2></summary>

#### Imports

```ts
import { network } from "@reef-chain/evm-util-lib";
```

---

### 🔹 `initProvider(providerUrl: string)`

Creates a new `WsProvider` and connects to the given Substrate node.

```ts
const provider = await network.provider.initProvider("wss://rpc.reefscan.com/ws");
```

---

### 🔹 `NETWORK_CONFIGS`

Built-in configurations for quick setup:

| Network         | Substrate RPC                       | EVM RPC                            | Explorer               |
| --------------- | ----------------------------------- | ---------------------------------- | ---------------------- |
| `ReefMainnet`   | `ws://34.123.142.246:9944`          | `http://34.123.142.246:8545`       | Parity Blockscout      |
| `ReefTestnet`   | `wss://rpc-testnet.reefscan.com/ws` | `https://evm-testnet.reefscan.com` | `testnet.reefscan.com` |
| `ReefLocalhost` | `ws://localhost:9944`               | `http://localhost:8545`            | `http://localhost`     |

Example:

```ts
const mainnet = network.config.NETWORK_CONFIGS.mainnet;
```

---

</details>

---

<details>
<summary><h2>💳 account module</h2></summary>

#### Imports

```ts
import { account } from "@reef-chain/evm-util-lib";
```

Includes:

* `nativePallet` — handle Substrate balances
* `revivePallet` — handle Revive bridge EVM logic

---

### 🔹 nativePallet

#### `getBalance(address: string): Promise<string>`

Fetch native REEF balance from Substrate.

```ts
const bal = await account.nativePallet.getBalance("5F...");
```

---

### 🔹 revivePallet

#### `getReviveEvmAddress(address: string): Promise<string>`

Converts Substrate address → EVM-compatible address.

```ts
const evmAddr = await account.revivePallet.getReviveEvmAddress("5F...");
```

#### `sendToReviveEvmAddress(keypair, toAddress: string): Promise<boolean>`

Sends REEF tokens to a Revive EVM address.

```ts
await account.revivePallet.sendToReviveEvmAddress(keypair, "0xEvm...");
```

#### `getNativeAddress(reviveEvmAddress: string): Promise<string>`

Finds original Substrate account for a Revive EVM address.

```ts
const nativeAddr = await account.revivePallet.getNativeAddress("0x...");
```

#### `getBalance(reviveEvmAddress: string): Promise<string>`

Fetches EVM-side balance for a Revive address.

```ts
const balance = await account.revivePallet.getBalance("0x...");
```

---

</details>

---

<details>
<summary><h2>🪪 signers module</h2></summary>

#### Imports

```ts
import { signers } from "@reef-chain/evm-util-lib";
```

---

### 🔹 `MnemonicSigner`

Implements the Substrate `Signer` interface using a mnemonic phrase.

```ts
const signer = new signers.MnemonicSigner("seed sock milk update ...");
const addr = await signer.getAddress();
```

#### `signPayload(payload: SignerPayloadJSON)`

Signs Substrate extrinsic payloads.

#### `signRaw(payloadRaw: SignerPayloadRaw)`

Signs arbitrary data or messages.

---

### Example usage

```ts
import { reefState, network, signers } from "@reef-chain/evm-util-lib";

await reefState.initReefState(network.config.NETWORK_CONFIGS.localhost);
const signer = new signers.MnemonicSigner("seed sock milk update ...");

const addr = await signer.getAddress();
console.log("Address:", addr);
```

---

</details>

---

<details>
<summary><h2>⚡ evm module</h2></summary>

#### Imports

```ts
import { evm } from "@reef-chain/evm-util-lib";
```

Provides multiple EVM-related APIs via submodules.

| Submodule   | Description                  |
| ----------- | ---------------------------- |
| `tx`        | Transaction details          |
| `blocks`    | Block info                   |
| `addresses` | Token holders & REEF holders |
| `tokens`    | Tokens & transfers           |
| `contracts` | Verified smart contracts     |
| `nfts`      | NFT ownership                |
| `event`     | Live updates via Pusher      |

---

### 🔹 evm.tx

#### `getTransactionInfo(txHash: string): Promise<TransactionInfo>`

Fetches full transaction details from BlockScout.

```ts
const tx = await evm.tx.getTransactionInfo("0x...");
```

---

### 🔹 evm.blocks

#### `getBlockInfo(hashOrBlockNo: string): Promise<BlockInfo>`

Fetch block info, miner, and gas stats.

```ts
const block = await evm.blocks.getBlockInfo("11456971");
```

---

### 🔹 evm.addresses

#### `getReefHolders(): Promise<ReefHolder[]>`

Fetches all REEF token holders recursively using pagination.

```ts
const holders = await evm.addresses.getReefHolders();
```

#### `getTokenHolders(address: string): Promise<any[]>`

Fetches all holders for a given ERC token.

```ts
const tokenHolders = await evm.addresses.getTokenHolders("0xEE3dAE...");
```

---

### 🔹 evm.tokens

#### `getTokens(query: string, types?: TokenType[]): Promise<Token[]>`

Search for tokens by name/symbol and type (`ERC-20`, `ERC-721`, `ERC-1155`).

```ts
const tokens = await evm.tokens.getTokens("usd", ["ERC-20"]);
```

#### `getTokenTransfers(tokenAddress: string): Promise<TokenTransfer[]>`

Recursively fetch all token transfers.

```ts
const transfers = await evm.tokens.getTokenTransfers("0xEE3dAE...");
```

---

### 🔹 evm.contracts

#### `getAllContracts(query?: string): Promise<SmartContract[]>`

Fetch all verified smart contracts (optionally filtered by `q`).

```ts
const verified = await evm.contracts.getAllContracts("dex");
```

#### `getVerifiedContract(address: string): Promise<any>`

Fetch a specific verified contract’s metadata.

```ts
const contract = await evm.contracts.getVerifiedContract("0x...");
```

---

### 🔹 evm.nfts

#### `getNftsForUser(address: string): Promise<any[]>`

Fetch NFTs owned by an address (`ERC-721`, `ERC-1155`, `ERC-404`).

```ts
const nfts = await evm.nfts.getNftsForUser("0x5b17...");
```

---

### 🔹 evm.event

#### `evmAddressesEventsObs$`

Reactive Pusher observable for real-time address updates.

```ts
evm.event.evmAddressesEventsObs$.subscribe(console.log);
```

---

</details>

---

## 🧩 Type Definitions

This library is fully typed with interfaces like:

* `NetworkConfig`, `Provider`
* `BlockInfo`, `TransactionInfo`
* `Token`, `TokenTransfer`, `SmartContract`
* `ReefHolder`, `ReefStateResponse`

All methods return properly typed promises.

---

## 🧱 Architecture

* Built on **@polkadot/api** for Substrate
* Uses **ethers.js** for EVM queries
* Integrates **BlockScout APIs**
* Fully reactive via **rxjs**

---

## ✨ Example End-to-End

```ts
import { reefState, network, evm, account } from "@reef-chain/evm-util-lib";

await reefState.initReefState(network.config.NETWORK_CONFIGS.mainnet);

const block = await evm.blocks.getBlockInfo("latest");
const tokens = await evm.tokens.getTokens("reef");
const balance = await account.nativePallet.getBalance("5F...");

console.log({ block, tokens, balance });
```

---

## 👨‍💻 Author

**Anukul Pandey**
Building Reef-based developer infrastructure 🪸
