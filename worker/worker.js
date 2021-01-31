const zmq = require("zeromq/v5-compat");
let req = zmq.socket("req");

function isPrime(num) {
  let s = Math.sqrt(num);
  for (let i = 2; i <= s; i++) if (num % i === 0) return false;
  return num > 1;
}

req.identity = "Worker1" + process.pid;
req.connect("tcp://queue:9999");
req.on("message", (c, sep, msg) => {
  console.log(`MSG: ${msg} received from ${c}`);
  msg = JSON.parse(msg);
  const res = isPrime(Number(msg.message));
  msg.message = res;
  console.log(`Returned MSG: ${JSON.stringify(msg)}`);
  req.send([c, "", JSON.stringify(msg)]);
});
req.send(["", "", ""]);
