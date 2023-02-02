import React, { useCallback } from "react";
import { useCreateChatroomMutation, useListChatroomsQuery } from "@api";
import Layout from "@views/Layout";
import ChatroomCard from "./ChatroomCard";
import styles from "./Chatrooms.module.sass";

interface Props {}

const Chatrooms: React.FC<Props> = () => {
  const { data } = useListChatroomsQuery();

  const [mutate] = useCreateChatroomMutation();

  const onCreateChatroom = useCallback(async () => {
    const name = prompt("請輸入聊天室名稱")?.trim();
    if (!name) return;

    await mutate({
      variables: { name },
      refetchQueries: ["ListChatrooms"],
      awaitRefetchQueries: true
    });
  }, []);

  return (
    <Layout>
      <div className={styles.grid}>
        {data?.chatrooms.map((chatroom) => (
          <ChatroomCard key={chatroom.id} chatroom={chatroom} />
        ))}
      </div>
      <div>
        <button type="button" onClick={onCreateChatroom}>
          建立聊天室
        </button>
      </div>
    </Layout>
  );
};

export default Chatrooms;
