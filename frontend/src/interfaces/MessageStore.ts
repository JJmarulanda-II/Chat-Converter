import { Socket } from 'socket.io-client';
import Message from "./Message";

export interface MessageStore {
    messages: Message[];
    userName: string;
    setUserName: (userName: string) => void;
    addMessage: (message: Message) => void;
    chatStarted: boolean;
    setChatStarted: (started: boolean) => void;
    socket: Socket; 
}
