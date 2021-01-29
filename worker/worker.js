var zmq = require("zeromq"),
  sock = new zmq.Reply();

async function run() {
  await sock.bind("tcp://127.0.0.1:9998");
  console.log("Server Listening");
  while (true) {
    const [msg] = await sock.receive();
    sock.send(msg);
    console.log(msg.toString());
  }
}

run();
