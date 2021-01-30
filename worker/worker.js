const zmq = require("zeromq/v5-compat");
let req = zmq.socket("req");
req.identity = "Worker1" + process.pid;
req.connect("tcp://localhost:9999");
req.on("message", (c, sep, msg) => {
  req.send([c, "", msg]);
});
req.send(["", "", ""]);
