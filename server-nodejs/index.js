const { WebSocketServer, WebSocket } = require("ws");

const port = process.env.PORT || 8080;

const wss = new WebSocketServer({ port });

wss.on("connection", function connection(ws) {
  console.log("Connected");

  ws.on("message", function message(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});
