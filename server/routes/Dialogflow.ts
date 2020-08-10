import { WebhookClient } from "dialogflow-fulfillment-ts";
import io from "../Server";

export const dialogflowWebhooks = (req: any, res: any) => {
  const agent = new WebhookClient({ request: req, response: res });

  const sockets = io.sockets;
  function showFulfillment() {
    agent.add("Ok, I will show the fulfillment!");
    sockets.emit("showFulfillment", "DialogFlow called Welcome");
  }

  const open = () => {
    agent.add(`For sure I will open ${agent.parameters["App"]}`);
    sockets.emit("open", agent.parameters["App"]);
  };

  let intentMap = new Map();
  intentMap.set("show fulfillment", showFulfillment);
  intentMap.set("Open", open);
  agent.handleRequest(intentMap);
};
