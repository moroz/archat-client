import { useGetChatroomQuery } from "@api";
import { useSendOfferMutation } from "@api/mutations/offers";
import { useJoinChatroomSubscription } from "@api/subscriptions";
import { Chatroom } from "@interfaces";
import Layout from "@views/Layout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Instance } from "simple-peer";
import SimplePeer from "simple-peer/simplepeer.min.js";
import styles from "./Chatroom.module.sass";
import VideoContainer from "./VideoContainer";

interface Props {}

function getVideoStream() {
  return navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
}

interface ChatroomMember {
  peer: Instance;
}

const ChatroomView: React.FC<Props> = () => {
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);
  const { id } = useParams();
  useJoinChatroomSubscription(id!, {
    onComplete: console.log,
    onData: (data) => {
      const event = data.data.data?.events;
      if (!event) return;
      console.log(event);
      switch (event.type) {
        case "INITIAL_DATA": {
          setChatroom(event.chatroom);
          break;
        }

        case "PEER_LEFT": {
          const id = event.sender;
          const newMembers = (chatroom?.members ?? []).filter(
            (m) => m.id !== id
          );
          setChatroom({ ...chatroom!, members: newMembers });
        }

        case "PEER_JOINED": {
          setChatroom(event.chatroom);
        }

        default: {
          console.log(event);
        }
      }
    }
  });
  const [mutate] = useSendOfferMutation();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // const onSendOffer = () => {
  //   mutate({ variables: { chatroomId: id!, offer: "test offer" } });
  // };

  useEffect(() => {
    getVideoStream().then(setLocalStream);
  }, []);

  return (
    <Layout>
      <div className={styles.chatroom}>
        <aside className={styles.sidebar}>
          <h2>{chatroom?.name}</h2>
          <div className={styles.members}>
            {chatroom?.members.map((member) => (
              <article className={styles.member}>{member.displayName}</article>
            ))}
          </div>
        </aside>
        <main className={styles.peers}>
          <VideoContainer stream={localStream} />
        </main>
      </div>
    </Layout>
  );
};

export default ChatroomView;
