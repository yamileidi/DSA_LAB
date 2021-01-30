const zmq = require("zeromq/v5-compat");
// comunicación entre colas
let lbqrec = zmq.socket("pull");
let lbqsend = zmq.socket("pub");

lbqrec.bind(`tcp://*:9997`);
lbqsend.bind(`tcp://*:9996`);

lbqrec.on("message", (c, m) => {
  console.log("Message received from a queue");
  console.log(c.toString());
  console.log(m.toString());
  lbqsend.send(["work", JSON.stringify({ c: c.toString(), m: m.toString() })]);
});
