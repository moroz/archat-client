import { useAuth } from "@api";
import React from "react";
import styles from "../Layout.module.sass";

interface Props {}

const Header: React.FC<Props> = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <section className={styles.userData}>
        {user?.displayName} ({user?.email})
      </section>
    </header>
  );
};

export default Header;
