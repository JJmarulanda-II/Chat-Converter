"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketService_1 = __importDefault(require("../services/socketService"));
class SocketController {
    constructor(io) {
        this.io = io;
        this.userNames = new Map();
        this.socketService = new socketService_1.default();
        this.initialize();
    }
    initialize() {
        this.io.on("connection", (socket) => {
            console.log("Id usuario: " + socket.id);
            socket.on("join", (username) => this.handleJoin(socket, username));
            socket.on("message", (body) => this.handleMessage(socket, body));
        });
    }
    handleJoin(socket, username) {
        this.userNames.set(socket.id, username);
        // Mensaje privado para el nuevo usuario
        socket.emit("message", {
            body: `¡Bienvenido al chat de divisas, ${username}!\n
        Puedes convertir divisas utilizando los siguientes formatos:\n
        1. Para convertir de USD a COP: \`convertir <cantidad> USD-COP\`\n
        2. Para convertir de COP a USD: \`convertir <cantidad> COP-USD\`\n
        3. Para convertir a cualquier otra moneda, especifica los códigos ISO de la siguiente manera: \`convertir <monto> <ISO1>-<ISO2>\`\n
        Si tienes alguna duda, ¡no dudes en preguntar!`,
            id: socket.id,
            sender: 'server' // Indica que el mensaje es del servidor
        });
        // Mensaje para todos los demás usuarios
        socket.broadcast.emit("message", {
            body: `${username} se ha unido al chat.`,
            id: socket.id,
            username: username,
            sender: 'server' // Indica que el mensaje es del servidor
        });
        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id, username);
            // Mensaje de desconexión
            socket.broadcast.emit("message", {
                body: `El usuario ${username} se ha desconectado.`,
                id: socket.id,
                username,
                sender: 'server' // Indica que el mensaje es del servidor
            });
        });
    }
    handleMessage(socket, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(body);
            const userName = this.userNames.get(socket.id) || 'Usuario desconocido';
            // Mensaje de cliente que se envía a otros clientes
            socket.broadcast.emit("message", {
                body,
                id: socket.id,
                userName,
                timestamp: new Date().toISOString(),
                sender: 'client' // Indica que el mensaje es del cliente
            });
            // Procesa la respuesta
            const response = yield this.socketService.extractTextCurrency(body);
            // Envía la respuesta al cliente que envió el mensaje\
            //Se usa this.io para que tanto los externo como el emisor puedan ver el mensaje
            this.io.emit("message", {
                body: response,
                id: socket.id,
                timestamp: new Date().toISOString(),
                sender: 'server' // Indica que el mensaje es del servidor
            });
        });
    }
}
exports.default = SocketController;
