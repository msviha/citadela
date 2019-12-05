import * as path from 'path';
import express from 'express';
import serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

// Import demo room handlers
import { CitadelaRoom } from "./src/citadela";

const port = Number(process.env.PORT || 4201);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app)
});

// Register CitadelaRoom as "chat"
gameServer.register("citadela", CitadelaRoom);

// Register CitadelaRoom with initial options, as "chat_with_options"
// onInit(options) will receive client join options + options registered here.
gameServer.register("chat_with_options", CitadelaRoom, {
    custom_options: "you can use me on Room#onInit"
});

app.use('/', express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

// process.on("uncaughtException", (e) => {
//   console.log(e.stack);
//   process.exit(1);
// });

console.log(`Listening on http://localhost:${ port }`);
