import { describe, test, expect } from "vitest";
import {evm} from "../src/index";
import { firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";

describe("Pusher live events", () => {
  test("should receive an addresses event (no timeout)", async () => {
    const data = await firstValueFrom(
      evm.evmAddressesEventsObs$.pipe(
        filter((event) => Array.isArray(event?.addresses) && event.addresses.length > 0)
      )
    );

    console.log("✅ Received:", data.addresses);
    expect(Array.isArray(data.addresses)).toBe(true);
    expect(data.addresses.length).toBeGreaterThan(0);
  },25000);
});
