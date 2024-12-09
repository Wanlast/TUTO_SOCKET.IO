import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
app.use(express.static("public")); // serve the files in "public" statically
const PORT = process.env.PORT || 3000;
const expressServer = app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}.`)
);

import { Server } from "socket.io";
// io is our socket.io server
const io = new Server(expressServer, {
  cors: { origin: "http://localhost:5000" },
  auth: {
    secret: "This is a secret",
  },
  query: {
    meaningOfLife: 42,
  },
});

// io.on("eventName", callback); --- on is a regular javascript/node event listener
// io.emit("eventName", data); --- emit is the other BIG method
io.on("connection", (socket) => {
  console.log(socket.handshake);
  console.log(socket.id, "has joined our server !");
  // // 1st arg of emit is the event name
  // // socket.emit will emit to THIS one socket
  // socket.emit("welcome", [1, 2, 3]); //push an event to the client/browser
  // // io.emit will emit to ALL sockets connected to the server
  // io.emit("newClient", socket.id);
  // socket.on("thankYou", (data) => {
  //   console.log("message from client", data);
  // });
  socket.on("messageFromClientToServer", (newMessage) => {
    // pass through the message to everyone connected
    io.emit("messageFromServerToAllClients", newMessage);
  });
});
