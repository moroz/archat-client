import React from "react";
import { useListChatroomsQuery } from "../queries/chatrooms";

interface Props {}

const Chatrooms: React.FC<Props> = () => {
  const { data, loading } = useListChatroomsQuery();

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Chatrooms;
