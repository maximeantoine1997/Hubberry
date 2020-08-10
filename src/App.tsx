import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import socketIo from "socket.io-client";
import "./App.css";
import Applications from "./pages/Applications";
import Home from "./pages/Home";

const ENDPOINT = "http://localhost:5000/";

const App = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log("listening...");
    const socket = socketIo(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.on("open", (response: any) => {
      const path = response === "home" ? "/" : `/${response}`;
      history.push(path);
    });

    return () => {
      socket.disconnect();
    };
  });
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/apps">
          <Applications />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default App;
