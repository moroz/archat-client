import React, { useCallback } from "react";
import { useCreateChatroomMutation, useListChatroomsQuery } from "@api";

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
    <main>
      <div>{JSON.stringify(data, null, 2)}</div>
      <div>
        <button type="button" onClick={onCreateChatroom}>
          建立聊天室
        </button>
      </div>
    </main>
  );
};

export default Chatrooms;
