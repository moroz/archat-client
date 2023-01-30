import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { signIn } from "./api";
import ChatView from "./ChatView";
import { initializeClient } from "./graphql";

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
      <ChatView />
    </ApolloProvider>
  );
};

export default App;
