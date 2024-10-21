// src/store/useStore.ts

import { create } from "zustand";
import { MessageStore } from "../interfaces/MessageStore";
import Message from "../interfaces/Message";
import { io } from "socket.io-client";

const socket = io("https://idyllic-puffpuff-d13959.netlify.app/");

const useStore = create<MessageStore>((set) => ({
  messages: [],
  userName: "",
  setUserName: (userName: string) => set({ userName }), // Puedes simplificar esto
  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  chatStarted: false,
  setChatStarted: (started: boolean) => set({ chatStarted: started }), // Corrige aquí
  socket,
}));

export default useStore;
