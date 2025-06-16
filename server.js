// server.js
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

const messages = []; // In-memory message store

io.on("connection", (socket) => {
  // Send all previous messages to the new client
  socket.emit("chat history", messages);

  socket.on("chat message", (msg) => {
    messages.push(msg); // Save message
    io.emit("chat message", msg); // Broadcast to all clients
  });
  
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});