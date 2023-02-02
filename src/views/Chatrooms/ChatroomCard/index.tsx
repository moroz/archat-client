import { Chatroom } from "@interfaces";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ChatroomCard.module.sass";

interface Props {
  chatroom: Chatroom;
}

const ChatroomCard: React.FC<Props> = ({ chatroom }) => {
  return (
    <div className={styles.root}>
      <p>{chatroom.name}</p>
      <p>{chatroom.members.length} 位會員</p>
      <Link to={`/chatrooms/${chatroom.id}`} className="button">
        加入聊天室
      </Link>
    </div>
  );
};

export default ChatroomCard;
