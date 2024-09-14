// src/server.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});


// Handle socket connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for messages
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
