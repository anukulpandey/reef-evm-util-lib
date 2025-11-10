import { u8aToHex, u8aWrapBytes } from "@polkadot/util";
import { TypeRegistry } from "@polkadot/types";
import type {
    Signer,
  SignerPayloadJSON,
  SignerPayloadRaw,
  SignerResult,
} from "@polkadot/types/types";
import { Keyring } from "@polkadot/api";

const CRYPTO_TYPE = "sr25519";
const SS58_FORMAT = 42;
const keyring = new Keyring({ type: CRYPTO_TYPE, ss58Format: SS58_FORMAT });

async function keyPairFromMnemonic(mnemonic: string): Promise<any> {
  return keyring.addFromMnemonic(mnemonic, {}, CRYPTO_TYPE);
}

export class MnemonicSigner implements Signer {
  mnemonic: string;
  private nextId = 0;

  constructor(mnemonic: string) {
    this.mnemonic = mnemonic;
  }

  async getAddress(): Promise<string> {
    const pair: any = await keyPairFromMnemonic(this.mnemonic);
    return pair.address;
  }

  async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
    const registry = new TypeRegistry();
    registry.setSignedExtensions(payload.signedExtensions);

    const pair: any = await keyPairFromMnemonic(this.mnemonic);

    return {
      id: ++this.nextId,
      ...registry
        .createType("ExtrinsicPayload", payload, { version: payload.version })
        .sign(pair),
    };
  }

  async signRaw(payloadRaw: SignerPayloadRaw): Promise<SignerResult> {
    const pair: any = await keyPairFromMnemonic(this.mnemonic);
    if (pair.address === payloadRaw.address) {
    }
    return {
      id: ++this.nextId,
      signature: u8aToHex(pair.sign(u8aWrapBytes(payloadRaw.data))),
    };
  }
}