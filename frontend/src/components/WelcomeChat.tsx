import useStore from "../hooks/useStore";
import { useState, useEffect } from "react";

const WelcomeChat = () => {
  const { setChatStarted, setUserName, userName } = useStore();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validar el nombre ingresado
    if (name.trim() === "") {
      alert("Por favor, ingresa un nombre válido."); // Mensaje de error
      return; // Detener el envío del formulario
    }

    // Validación adicional: longitud mínima
    if (name.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return; // Detener el envío del formulario
    }

    // Validación adicional: caracteres permitidos (solo letras y números)
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      alert("El nombre solo puede contener letras y números.");
      return; // Detener el envío del formulario
    }

    setUserName(name); // Establece el nombre en la tienda
  };

  useEffect(() => {
    if (userName.length > 0) {
      console.log(userName);
      setChatStarted(true);
    }
  }, [userName, setChatStarted]);

  return (
    <div className="flex max-h-screen items-center justify-center bg-gray-800  sm:py-12 px-3">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-md bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gray-800/70"></div>
            <video
              src="/assets/videos/video.mp4"
              autoPlay
              loop
              poster="/assets/images/poster.png"
              className="w-auto h-auto object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="col-span-2 p-8 md:col-span-1">
            <div className="flex h-full flex-col justify-center">
              <h2 className="mb-4 text-xl font-bold uppercase tracking-tight text-gray-600">
                Bienvenido al Chat de divisas
              </h2>
              <p className="text-gray-600 mt-1 mb-3 text-justify">
                Este es un chat que te permite estar en línea junto con otros
                usuarios viendo las peticiones de todos en tiempo real. Por
                favor, digita tu nombre para continuar.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border h-8 text-black border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                    placeholder="Escribe tu nombre para el chat"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Acceder al Chat
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeChat;
