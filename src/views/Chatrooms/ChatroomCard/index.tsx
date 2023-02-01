import React from "react";
import styles from "./ChatroomCard.module.sass";

interface Props {}

const ChatroomCard: React.FC<Props> = () => {
  return (
    <div className={styles.root}>
      <p>Hello world!</p>
    </div>
  );
};

export default ChatroomCard;
