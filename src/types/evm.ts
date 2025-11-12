export interface TransactionInfo {
  priority_fee: string;
  raw_input: string;
  result: string;
  hash: string;
  max_fee_per_gas: string;
  revert_reason: string | null;
  confirmation_duration: [number, number];
  transaction_burnt_fee: string;
  type: number;
  token_transfers_overflow: boolean;
  confirmations: number;
  position: number;
  max_priority_fee_per_gas: string;
  transaction_tag: string | null;
  created_contract: {
    ens_domain_name: string | null;
    hash: string;
    implementations: string[];
    is_contract: boolean;
    is_scam: boolean;
    is_verified: boolean;
    metadata: any;
    name: string | null;
    private_tags: string[];
    proxy_type: string | null;
    public_tags: string[];
    watchlist_names: string[];
  };
  value: string;
  from: {
    ens_domain_name: string | null;
    hash: string;
    implementations: string[];
    is_contract: boolean;
    is_scam: boolean;
    is_verified: boolean;
    metadata: any;
    name: string | null;
    private_tags: string[];
    proxy_type: string | null;
    public_tags: string[];
    watchlist_names: string[];
  };
  gas_used: string;
  status: string;
  to: string | null;
  authorization_list: any[];
  method: string | null;
  fee: {
    type: string;
    value: string;
  };
  actions: any[];
  gas_limit: string;
  gas_price: string;
  decoded_input: any;
  token_transfers: any[];
  base_fee_per_gas: string;
  timestamp: string;
  nonce: number;
  historic_exchange_rate: string;
  transaction_types: string[];
  exchange_rate: string;
  block_number: number;
  has_error_in_internal_transactions: boolean;
}

export interface MinerInfo {
  ens_domain_name: string | null;
  hash: string;
  implementations: string[];
  is_contract: boolean;
  is_scam: boolean;
  is_verified: boolean;
  metadata: any;
  name: string | null;
  private_tags: string[];
  proxy_type: string | null;
  public_tags: string[];
  watchlist_names: string[];
}

export interface BlockInfo {
  base_fee_per_gas: string;
  burnt_fees: string;
  burnt_fees_percentage: number;
  difficulty: string;
  gas_limit: string;
  gas_target_percentage: number;
  gas_used: string;
  gas_used_percentage: number;
  hash: string;
  height: number;
  internal_transactions_count: number;
  miner: MinerInfo;
  nonce: string;
  parent_hash: string;
  priority_fee: string;
  rewards: any[];
  size: number;
  timestamp: string;
  total_difficulty: string | null;
  transaction_fees: string;
  transactions_count: number;
  type: string;
  uncles_hashes: string[];
  withdrawals_count: number;
}


export interface ReefHolder {
  transactions_count: string;
  coin_balance: string;
  ens_domain_name: string | null;
  hash: string;
  implementations: any[];
  is_contract: boolean;
  is_scam: boolean;
  is_verified: boolean;
  metadata: any | null;
  name: string | null;
  private_tags: any[];
  proxy_type: string | null;
  public_tags: any[];
  watchlist_names: any[];
}

export interface ReefHoldersResponse {
  items: ReefHolder[];
  total_supply: string;
  next_page_params: Record<string, any> | null;
  exchange_rate: string;
}


export type TokenType = "ERC-20" | "ERC-721" | "ERC-1155";

export interface Token {
  address_hash: string;
  circulating_market_cap: string;
  decimals: string;
  exchange_rate: string | null;
  holders_count: string;
  icon_url: string | null;
  name: string;
  symbol: string;
  total_supply: string;
  type: TokenType;
  volume_24h: string;
}

export interface TokensResponse {
  items: Token[];
  next_page_params: Record<string, any> | null;
  total_count: number;
}


export interface TokenTransfer {
  block_hash: string;
  block_number: number;
  from: {
    ens_domain_name: string | null;
    hash: string;
    is_contract: boolean;
  };
  log_index: number;
  method: string;
  timestamp: string;
  to: {
    ens_domain_name: string | null;
    hash: string;
    is_contract: boolean;
  };
  token: {
    address_hash: string;
    decimals: string;
    name: string;
    symbol: string;
    total_supply: string;
    type: string;
  };
  total: {
    decimals: string;
    value: string;
  };
  transaction_hash: string;
  type: string;
}

export interface TokenTransfersResponse {
  items: TokenTransfer[];
  next_page_params: Record<string, any> | null;
}
