import { ChatroomEvent } from "@/interfaces/events";
import { gql, SubscriptionHookOptions, useSubscription } from "@apollo/client";
import { nanoid } from "nanoid";

export const SESSION_ID = (() => {
  const existing = sessionStorage.getItem("SESSION_ID");
  if (existing) return existing;

  const newID = nanoid();
  sessionStorage.setItem("SESSION_ID", newID);
  return newID;
})();

export const JOIN_CHATROOM_SUBSCRIPTION = gql`
  subscription JoinChatroom($chatroomID: ID!, $sessionID: ID!) {
    events: joinChatroom(chatroomID: $chatroomID, sessionID: $sessionID) {
      type
      sender
      recipient
      offer
      chatroom {
        id
        name
        members {
          id
          userID
          isHuman
        }
      }
    }
  }
`;

export interface JoinChatroomSubscriptionResult {
  events: ChatroomEvent;
}

export interface JoinChatroomSubscriptionVariables {
  chatroomID: string;
  sessionID: string;
}

export const useJoinChatroomSubscription = (
  chatroomID: string,
  opts: SubscriptionHookOptions<
    JoinChatroomSubscriptionResult,
    JoinChatroomSubscriptionVariables
  > = {}
) =>
  useSubscription<
    JoinChatroomSubscriptionResult,
    JoinChatroomSubscriptionVariables
  >(JOIN_CHATROOM_SUBSCRIPTION, {
    variables: { chatroomID, sessionID: SESSION_ID },
    ...opts
  });

export const TIME_SUBSCRIPTION = gql`
  subscription {
    unixTimestamp
  }
`;

export const useTimeSubscription = () =>
  useSubscription(TIME_SUBSCRIPTION, { onData: console.log });
