import { ChatroomEvent } from "@/interfaces/events";
import { gql, SubscriptionHookOptions, useSubscription } from "@apollo/client";

export const JOIN_CHATROOM_SUBSCRIPTION = gql`
  subscription JoinChatroom($chatroomId: ID!) {
    events: joinChatroom(chatroomId: $chatroomId) {
      type
      sender
      recipient
      offer
      chatroom {
        id
        name
        members {
          id
        }
      }
    }
  }
`;

export interface JoinChatroomSubscriptionResult {
  events: ChatroomEvent;
}

export interface JoinChatroomSubscriptionVariables {
  chatroomId: string;
}

export const useJoinChatroomSubscription = (
  chatroomId: string,
  opts: SubscriptionHookOptions<
    JoinChatroomSubscriptionResult,
    JoinChatroomSubscriptionVariables
  > = {}
) =>
  useSubscription<
    JoinChatroomSubscriptionResult,
    JoinChatroomSubscriptionVariables
  >(JOIN_CHATROOM_SUBSCRIPTION, { variables: { chatroomId }, ...opts });

export const TIME_SUBSCRIPTION = gql`
  subscription {
    unixTimestamp
  }
`;

export const useTimeSubscription = () =>
  useSubscription(TIME_SUBSCRIPTION, { onData: console.log });
