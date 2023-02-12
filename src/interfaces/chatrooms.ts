export interface Member {
  __typename: "Member";
  id: string;
  userId: string;
  sessionId: string;
}

export interface Chatroom {
  __typename: "Chatroom";
  id: string;
  name: string;
  members: Member[];
}
