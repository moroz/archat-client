import Layout from "@views/Layout";
import React from "react";
import styles from "./Chatroom.module.sass";

interface Props {}

const Chatroom: React.FC<Props> = () => {
  return (
    <Layout>
      <div>
        <p>Hello world!</p>
      </div>
    </Layout>
  );
};

export default Chatroom;
