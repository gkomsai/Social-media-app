const io = require("socket.io")(8800, {
  pingTimeout: 60000,
    cors: {
      origin: ["http://localhost:3000","https://indian-social-media.vercel.app"],
    },
  });
  

  let onlineUsers = [];
  
  io.on("connection", (socket) => {
  
    // For adding a new User
    socket.on("add-new-user", (newUserId) => {
      // if user is not added previously
      if (!onlineUsers.some((el) => el.userId === newUserId)) {
        onlineUsers.push({ userId: newUserId, socketId: socket.id });
      }
      // sending all active users to new user
      io.emit("all-currently-online-users", onlineUsers);
    });


   //getting and  sending message to a specific user
   socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = onlineUsers.find((el) => el.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });


    
    socket.on("disconnect", () => {
      // removing only that user from the onlineUsers array who got offline
      onlineUsers = onlineUsers.filter((el) => el.socketId !== socket.id);
      // and sending all remaining users to the client
      io.emit("all-currently-online-users", onlineUsers);
    });
  
   
  });
  