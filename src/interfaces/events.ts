import { Chatroom } from "./chatrooms";

enum _ChatroomEventType {
  PeerJoined = "PEER_JOINED",
  PeerLeft = "PEER_LEFT",
  SdpOffer = "SDP_OFFER",
  InitialState = "INITIAL_DATA"
}

export type ChatroomEventType = `${_ChatroomEventType}`;

export interface ChatroomEvent {
  type: ChatroomEventType;
  sender: string;
  recipient: string;
  offer: string | null;
  chatroom: Chatroom | null;
}
