import { useEffect, useState } from 'react';
import Message from '../interfaces/Message';
import useStore from './useStore';
const useSocket = () => {
    const { addMessage, socket, userName } = useStore();
    const [greeted, setGreeted] = useState(false);

    useEffect(() => {

        if (userName && !greeted) {
            console.log(userName); 
            socket.emit('join', userName);
            setGreeted(true);
        }

        socket.on("message", receiveMessage);

        socket.on('disconnect', () => {
            console.log('Te has desconectado del servidor.');
        });

        return () => {
            socket.off("message", receiveMessage);
        };
    }, [userName, greeted]);

    const receiveMessage = (message: Message) => {
        addMessage(message); 
    };
};

export default useSocket;
