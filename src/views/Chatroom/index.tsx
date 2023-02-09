import { useGetChatroomQuery } from "@api";
import { useSendOfferMutation } from "@api/mutations/offers";
import { useJoinChatroomSubscription } from "@api/subscriptions";
import { Chatroom } from "@interfaces";
import Layout from "@views/Layout";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {}

const ChatroomView: React.FC<Props> = () => {
  const [subscriptionData, setSubscriptionData] = useState<any[]>([]);
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);
  const { id } = useParams();
  useJoinChatroomSubscription(id!, {
    onComplete: console.log,
    onData: (data) => {
      const event = data.data.data?.events;
      if (!event) return;
      if (event.type === "INITIAL_DATA") {
        setChatroom(event.chatroom);
      } else {
        setSubscriptionData((sd) => [...sd, event]);
      }
    }
  });
  const [mutate] = useSendOfferMutation();

  const onSendOffer = () => {
    mutate({ variables: { chatroomId: id!, offer: "test offer" } });
  };

  return (
    <Layout>
      <button type="button" onClick={onSendOffer}>
        Send offer
      </button>

      <div>
        <pre>{JSON.stringify(chatroom, null, 2)}</pre>
        <pre>{JSON.stringify(subscriptionData, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default ChatroomView;
