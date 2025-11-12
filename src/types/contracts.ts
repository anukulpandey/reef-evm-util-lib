
export interface SmartContract {
    address_hash: string;
    compiler_version: string | null;
    evm_version: string | null;
    name: string;
    optimization_enabled: boolean;
    optimization_runs: number | null;
    constructor_arguments: string | null;
    verified_at: string | null;
    creator_address_hash: string | null;
    creation_tx_hash: string | null;
    file_path: string | null;
    is_verified_via_sourcify: boolean;
  }
  
  export interface SmartContractsResponse {
    items: SmartContract[];
    next_page_params: Record<string, any> | null;
    total_count: number;
  }