import Pusher from "pusher-js";
import { Observable } from "rxjs";

export interface AddressEvent {
  addresses: string[];
}

export function createAddressObservable(): Observable<AddressEvent> {
  return new Observable<AddressEvent>((subscriber) => {
    console.log("🚀 Connecting to Pusher...");

    const pusher = new Pusher("e2150185128c2cf88c83", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("block-events");

    const handler = (data: AddressEvent) => {
      subscriber.next(data);
    };

    channel.bind("addresses", handler);

    return () => {
      console.log("🧹 Cleaning up Pusher subscription...");
      channel.unbind("addresses", handler);
      channel.unsubscribe();
      pusher.disconnect();
    };
  });
}
