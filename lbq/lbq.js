const zmq = require("zeromq/v5-compat");
// comunicación entre colas
let lbqrec = zmq.socket("pull");
let lbqsend = zmq.socket("pub");

lbqrec.bind(`tcp://*:9997`);
lbqsend.bind(`tcp://*:9996`);

lbqrec.on("message", (c, m) => {
  if (c.toString() === "results") {
    console.log(`Results ${m} received`);
    lbqsend.send(["results", JSON.stringify({ m: m.toString() })]);
  } else {
    console.log(`Work from ${c.toString()} received`);
    lbqsend.send([
      "work",
      JSON.stringify({ c: c.toString(), m: m.toString() }),
    ]);
  }
});
