const zmq = require("zeromq/v5-compat");
const app = require("express")();
let sock = zmq.socket("push");
let results = zmq.socket("sub");

async function run() {
  const clientId = Math.random().toString(36).substring(7);
  var responses = {};
  results.connect("tcp://lbq:9996");
  results.subscribe("results");
  sock.connect("tcp://lbq:9997");

  app.get("/job/:number", function (req, res) {
    console.log("Received Request");
    const msgId = Math.random().toString(36).substring(7);
    const data = {
      id: msgId,
      message: req.params.number,
    };
    responses[msgId] = res;
    sock.send([clientId, JSON.stringify(data)]);
  });

  app.get("/alive", function (req, res) {
    res.send(true);
  });

  results.on("message", function (topic, data) {
    console.log(data.toString());
    const { m } = JSON.parse(data.toString());
    console.log(`m: ${m}`);
    const { id, message } = JSON.parse(m);
    console.log(id, message);
    if (responses[id]) {
      const res = responses[id];
      res.send(message);
      delete responses[id];
    }
  });

  app.listen(3000, "0.0.0.0", () => {
    console.log("Frontend Listening");
  });
}

run();
