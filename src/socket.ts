import { ApolloClient } from "@apollo/client";
import { signIn } from "./api";
import { initializeClient } from "./graphql";

export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

export default class SignalSocket {
  open: boolean = false;
  client?: ApolloClient<any>;

  static instance = new SignalSocket();

  constructor() {
    signIn("user@example.com", "foobar").then((token) => {
      this.client = initializeClient(token!);
    });
  }
}
