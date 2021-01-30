const zmq = require("zeromq/v5-compat");
const app = require("express")();
let sock = zmq.socket("req");

async function run() {
  var responses = {};
  sock.connect("tcp://localhost:9998");

  app.get("/job/:number", function (req, res) {
    const msgId = Math.random().toString(36).substring(7);
    const data = {
      id: msgId,
      message: req.params.number,
    };
    responses[msgId] = res;
    sock.send(JSON.stringify(data));
  });

  sock.on("message", function (data) {
    console.log(data.toString());
    data = JSON.parse(data.toString());
    const msgId = data.id;
    const res = responses[msgId];
    delete responses[msgId];
    res.send(data.message);
  });

  app.listen(3000, "0.0.0.0", () => {
    console.log("Frontend Listening");
  });
}

run();
