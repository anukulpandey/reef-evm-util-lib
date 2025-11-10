import { reefState } from "..";
import { decodeAddress, keccakAsHex } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";

const AMOUNT_WEI = 10_000_000_000_000_000_000n; // 10 REEF

export const getBalance = async (address: string): Promise<string> => {
    const provider = reefState.getProvider();
    const accountInfo = await provider.api.query.system.account(address);
    return (accountInfo as any).data.free.toString();
};

export const getReviveEvmAddress = async (address: string): Promise<string> => {
    const pubKey = decodeAddress(address);
    const evmAddress = "0x" + keccakAsHex(u8aToHex(pubKey)).slice(26);
    return evmAddress;
};

export const sendToReviveEvmAddress = async (keypair:any,toAddress: string): Promise<boolean> => {
    try {
        const provider = reefState.getProvider();
        const api = provider.api;

        const transferMeta = api.tx.revive.transfer.meta.toJSON();
        const args = transferMeta.args || [];

        const argTypes = (args as any).map((a: any) =>
            (a?.type?.info ? a.type.info : a?.type || "").toString().toLowerCase()
        );
        const argNames = (args as any).map((a: any) => (a?.name || "").toString().toLowerCase());
        const lowerHas = (s: string) =>
            argTypes.join(",").includes(s) || argNames.join(",").includes(s);

        const sendAndWait = async (tx: any) =>
            new Promise<void>(async (resolve) => {
                // @ts-ignore
                const unsub = await tx.signAndSend(keypair, ({ status, dispatchError }) => {
                    if (status.isInBlock) console.log(`📦 Included: ${status.asInBlock}`);
                    unsub();
                    resolve();
                });
            });

        if ((args as any).length === 2 && (lowerHas("h160") || lowerHas("h-160"))) {
            console.log("⏳ Calling revive.transfer(H160, Amount) ...");
            await sendAndWait(api.tx.revive.transfer(toAddress, AMOUNT_WEI));
            return true;
        } else if ((args as any).length === 3 && lowerHas("accountid") && lowerHas("h160")) {
            console.log("⏳ Calling revive.transfer(AccountId, H160, Amount) ...");
            await sendAndWait(api.tx.revive.transfer(keypair.address, toAddress, AMOUNT_WEI));
            return true;
        } else {
            console.log("⛔️ Unknown revive.transfer signature, trying default (H160, Amount) ...");
            await sendAndWait(api.tx.revive.transfer(toAddress, AMOUNT_WEI));
            return true;
        }
    } catch (error) {
        console.log("❌ Error in sendToReviveEvmAddress:", error);
        return false;
    }
};
