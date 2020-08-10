import express, { json } from "express";
import http from "http";
import socket from "socket.io";
import { dialogflowWebhooks } from "./routes/Dialogflow";
import { postMessages, putMessage } from "./routes/Messages";
import { getUser } from "./routes/Users";

const app = express();

const server = http.createServer(app);
const io = socket.listen(server);
const port = process.env.PORT || 5000;

// Socket IO
io.on("connect", (socket) => {
  console.log("New user online", socket.id);

  socket.on("disconnect", () => {
    console.log("A user went offline", socket.id);
  });
});

// user
app.get("/api/users/:id", getUser);

// messages
app.post("/api/messages", postMessages);
app.put("/api/messages/:id", putMessage);

// dialogflow
app.post("/dialogflow", json(), dialogflowWebhooks);

// listen
server.listen(port, () => console.log(`Listening on port ${port}`));

export default io;
