
// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// let onlineUser = [];

// const addUser = (userId, socketId) => {
//   const userExits = onlineUser.find((user) => user.userId === userId);
//   if (!userExits) {
//     onlineUser.push({ userId, socketId });
//   }
// };

// const removeUser = (socketId) => {
//   onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return onlineUser.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (userId) => {
//     addUser(userId, socket.id);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     const receiver = getUser(receiverId);
//     io.to(receiver.socketId).emit("getMessage", data);
   
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });

// io.listen("4000");

import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store online users
let onlineUser = [];

// Add a user to the list
const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
    console.log(`User added: ${userId}, Socket ID: ${socketId}`);
  }
};

// Remove a user when they disconnect
const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
  console.log(`User removed, Socket ID: ${socketId}`);
};

// Get a user by userId
const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Handle socket connection
io.on("connection", (socket) => {
  //console.log("A user connected:", socket.id);

  // Add user
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
     // console.log(`Message sent to Receiver ID: ${receiverId}`);
    } else {
      //console.log(`Receiver with ID ${receiverId} not found.`);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    //console.log("A user disconnected:", socket.id);
  });
});

// Start the server
io.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});
