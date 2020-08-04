import { dialogflowWebhooks } from "./routes/Dialogflow";
import bodyParser from "body-parser";
import express, { json } from "express";
import { postMessages, putMessage } from "./routes/Messages";
import { getUser } from "./routes/Users";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.get("/api/users/:id", getUser);

// messages
app.post("/api/messages", postMessages);
app.put("/api/messages/:id", putMessage);

// dialogflow
app.post("/dialogflow", dialogflowWebhooks);

app.listen(port, () => console.log(`Listening on port ${port}`));
