export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

export default class SignalSocket {
  socket: WebSocket;
  open: boolean;

  static instance = new SignalSocket();

  constructor() {
    this.socket = new WebSocket(WEBSOCKET_URL);
    this.setUpSocketListeners();
    this.open = false;
  }

  private setUpSocketListeners() {
    this.socket.addEventListener("open", () => {
      console.log("socket open");
      this.open = true;
    });
  }

  onMessage = (handler: (e: any) => any) => {
    this.socket.addEventListener("message", (e) => {
      try {
        const parsed = JSON.parse(e.data);
        handler(parsed);
      } catch (_e) {}
    });
  };

  broadcast(message: any) {
    this.socket.send(message);
  }
}
