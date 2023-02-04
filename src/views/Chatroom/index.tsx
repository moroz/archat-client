import {
  useJoinChatroomSubscription,
  useTimeSubscription
} from "@api/subscriptions";
import Layout from "@views/Layout";
import React from "react";
import { useParams } from "react-router-dom";

interface Props {}

const Chatroom: React.FC<Props> = () => {
  const { id } = useParams();
  const { data } = useJoinChatroomSubscription(id!, {
    onData: console.log
  });

  // useTimeSubscription();

  return (
    <Layout>
      <div>
        <p>Hello world!</p>
      </div>
    </Layout>
  );
};

export default Chatroom;
