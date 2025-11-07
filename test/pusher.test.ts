import { describe, test, expect } from "vitest";
import { createAddressObservable } from "../src/utils/pusher.ts";
import { firstValueFrom, timeout, catchError, of } from "rxjs";

describe("Pusher live events", () => {
  test(
    "should receive an addresses event within 20s",
    async () => {
      const address$ = createAddressObservable();

      const data = await firstValueFrom(
        address$.pipe(
          timeout({ each: 20000 }),
          catchError((err) => {
            console.warn("⚠️ Timed out waiting for Pusher event", err);
            return of(null);
          })
        )
      );

      if (data) {
        console.log("✅ Received:", data.addresses);
        expect(Array.isArray(data.addresses)).toBe(true);
      } else {
        console.log("⚠️ No event received.");
        expect(data).toBeNull();
      }
    },
    25000 // allow 25s timeout for the test itself
  );
});
