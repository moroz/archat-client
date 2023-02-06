import { useSendOfferMutation } from "@api/mutations/offers";
import { useJoinChatroomSubscription } from "@api/subscriptions";
import Layout from "@views/Layout";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {}

const Chatroom: React.FC<Props> = () => {
  const [subscriptionData, setSubscriptionData] = useState<any[]>([]);
  const { id } = useParams();
  useJoinChatroomSubscription(id!, {
    onData: (data) => {
      const event = data.data.data?.events;
      if (!event) return;
      setSubscriptionData((sd) => [...sd, event]);
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
        <pre>{JSON.stringify(subscriptionData, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default Chatroom;
