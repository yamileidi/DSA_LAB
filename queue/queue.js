const zmq = require("zeromq/v5-compat");
let cli = [],
  req = [],
  workers = [];
let sc = zmq.socket("router");
let sw = zmq.socket("router");
// comunicación entre colas
// let sq = zmq.socket("router");

// sq.bind("tcp://queue:9997");
sc.bind("tcp://*:9998");
sw.bind("tcp://*:9999");

// sq.on("message", (data) => {
//   console.log(data);
// });

sc.on("message", (c, sep, m) => {
  console.log("Queue Message Received from client");
  if (workers.length == 0) {
    console.log("No workers available");
    cli.push(c);
    req.push(m);
  } else {
    console.log("Request sent to worker");
    sw.send([workers.shift(), "", c, "", m]);
  }
});

sw.on("message", (w, sep, c, sep2, r) => {
  console.log("Queue Message Received from server");
  if (c == "") {
    console.log(`Worker ${w} available`);
    workers.push(w);
    return;
  }
  if (cli.length > 0) {
    console.log(`Queued msg sent to worker`);
    sw.send([w, "", cli.shift(), "", req.shift()]);
  } else {
    console.log(`Worker ${w} available`);
    workers.push(w);
  }
  console.log(`Request returned to client ${c}`);
  sc.send([c, "", r]);
});
