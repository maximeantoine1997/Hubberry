import { WebhookClient } from "dialogflow-fulfillment-ts";

export const dialogflowWebhooks = (req: any, res: any) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome() {
    agent.add("Welcome Emma!");
    agent.add("What can I do for you today?");
  }

  const open = () => {
    agent.add(`For sure I will open ${agent.parameters["App"]}`);
  };

  let intentMap = new Map();
  intentMap.set("show fulfillment", welcome);
  intentMap.set("Open", open);
  agent.handleRequest(intentMap);
};
