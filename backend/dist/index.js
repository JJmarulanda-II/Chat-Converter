"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const SocketController_1 = __importDefault(require("../src/controllers/SocketController"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Crear la app de express
const app = (0, express_1.default)();
// Crear el servidor http de node
const server = http_1.default.createServer(app);
// Configurar Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});
// Inicializar el controlador de sockets
const socketController = new SocketController_1.default(io);
const port = process.env.PORT || 3000;
// Iniciar el servidor http
server.listen(port, () => {
    console.log("Server listening on port", port);
});
