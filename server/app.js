import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const PORT = 3000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Ensure this matches your client's URL
        methods: ["GET", "POST"],
        credentials: true
    },
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("message", ({room,message}) => {
        console.log({room,message});
        // This will send the message to all other connected clients, excluding the sender.
        io.to(room).emit("receive-message", message);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
      });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("API is running");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
