// src/store/useStore.ts

import { create } from "zustand";
import { MessageStore } from "../interfaces/MessageStore";
import Message from "../interfaces/Message";
import { io } from "socket.io-client";

const socket = io("https://chat-converter.onrender.com");

const useStore = create<MessageStore>((set) => ({
  messages: [],
  userName: "",
  setUserName: (userName: string) => set({ userName }),
  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  chatStarted: false,
  setChatStarted: (started: boolean) => set({ chatStarted: started }),
  socket,
}));

export default useStore;
