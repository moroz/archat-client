import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { signIn, initializeClient } from "@api";
import Chatrooms from "./views/Chatrooms";

interface Props {}

const App: React.FC<Props> = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    signIn("user@example.com", "foobar").then(setToken);
  }, [setToken]);

  const client = useMemo(() => {
    if (!token) return null;
    return initializeClient(token);
  }, [token]);

  if (!token) return <h1>Loading...</h1>;

  return (
    <ApolloProvider client={client!}>
      <Chatrooms />
    </ApolloProvider>
  );
};

export default App;
