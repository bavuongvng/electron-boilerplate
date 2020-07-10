const net = require("net");
const exec = require("child_process").exec;
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let isElectronStarted = false;
const tryConnection = () =>
  client.connect({ port }, () => {
    client.end();
    if (!isElectronStarted) {
      console.log("Start electron");
      isElectronStarted = true;
      exec("npm run electron");
    }
  });

tryConnection();

client.on("error", (error) => {
  // console.log("Got Error ", error);
  setTimeout(tryConnection, 1000);
});
