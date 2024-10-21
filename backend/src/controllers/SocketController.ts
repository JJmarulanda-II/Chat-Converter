import { Server, Socket } from "socket.io";
import SocketService from "../services/socketService";

class SocketController {
  private userNames: Map<string, string> = new Map();
  private socketService: SocketService;

  constructor(private io: Server) {
    this.socketService = new SocketService();
    this.initialize();
  }

  private initialize() {
    this.io.on("connection", (socket: Socket) => {
      console.log("Id usuario: " + socket.id);

      socket.on("join", (username: string) =>
        this.handleJoin(socket, username)
      );
      socket.on("message", (body: string) => this.handleMessage(socket, body));
    });
  }

  private handleJoin(socket: Socket, username: string) {

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

  private async handleMessage(socket: Socket, body: string) {
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
    const response: string = await this.socketService.extractTextCurrency(body);

    // Envía la respuesta al cliente que envió el mensaje\
    //Se usa this.io para que tanto los externo como el emisor puedan ver el mensaje
    this.io.emit("message", {
      body: response,
      id: socket.id,
      timestamp: new Date().toISOString(),
      sender: 'server' // Indica que el mensaje es del servidor
    });
  }
}

export default SocketController;
