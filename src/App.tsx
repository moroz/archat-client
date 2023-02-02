import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { signIn, initializeClient } from "@api";
import Chatrooms from "./views/Chatrooms";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatroom from "@views/Chatroom";

interface Props {}

const App: React.FC<Props> = () => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("access_token")
  );

  useEffect(() => {
    signIn("user@example.com", "foobar").then((token) => {
      if (!token) return;
      setToken(token);
      sessionStorage.setItem("access_token", token);
    });
  }, [setToken]);

  const client = useMemo(() => {
    if (!token) return null;
    return initializeClient(token);
  }, [token]);

  if (!token) return <h1>Loading...</h1>;

  return (
    <ApolloProvider client={client!}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Chatrooms />} />
          <Route path="/chatrooms/:id" element={<Chatroom />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
