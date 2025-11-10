import { describe, test, expect } from "vitest";
import { signers } from "../src/index";

describe("Signer tests", () => {
    const mnemonics = "judge box bless much media say shrug crunch gun scorpion afraid object";

    test(
        "should initialise mnemonic signer",
        async () => {
            const signer = new signers.MnemonicSigner(mnemonics);
            console.log("🔑 Signer Address:", await signer.getAddress());
        },
    );

});
