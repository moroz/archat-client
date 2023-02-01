export interface Member {
  __typename: "Member";
  id: string;
}

export interface Chatroom {
  __typename: "Chatroom";
  id: string;
  name: string;
  members: Member[];
}
