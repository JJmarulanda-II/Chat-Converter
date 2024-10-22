import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import SocketController from "./controllers/SocketController";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear la app de express
const app = express();

// Crear el servidor http de node
const server = http.createServer(app);

// Configurar Socket.IO
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Inicializar el controlador de sockets
const socketController = new SocketController(io);

const port = process.env.PORT || 3000;

// Iniciar el servidor http
server.listen(port, () => {
  console.log("Server listening on port", port);
});
