# Chat P2P con Convertidor de Divisas

Este proyecto se a desplegadoe en linea, mediante VERCEL que es un plataforma que aloja datos en la nube y se podra visualizar atravez de este Link: https://chat-converter.onrender.com

Este proyecto es una aplicación web de chat peer-to-peer que incluye un convertidor de divisas en tiempo real utilizando una API externa. Utiliza WebSockets para la comunicación en tiempo real y PostgreSQL para el almacenamiento de datos.

## Características

- Chat peer-to-peer en tiempo real
- Convertidor de divisas integrado utilizando la API de cambio.today
- Interfaz de usuario intuitiva construida con React y Vite
- Almacenamiento de historial de chat y conversiones en PostgreSQL
- Pantalla de bienvenida personalizada

## Tecnologías Utilizadas

- Frontend:
  - React
  - Vite (para el build y desarrollo)
  - Tailwind CSS para estilos
- Backend: 
  - Node.js con Express
- Base de Datos: PostgreSQL (alojada en la nube)
- Comunicación en tiempo real: Socket.io
- ORM: Prisma
- API de Conversión de Divisas: cambio.today

## Requisitos Previos

- Node.js (versión 14.0 o superior)
- PostgreSQL (versión 12.0 o superior)
- NPM o Yarn
- Clave API de cambio.today

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/chat-currency-converter.git
   cd chat-currency-converter
   ```

2. Instala las dependencias:
   ```
   # Instalar dependencias del backend
   cd backend
   npm install

   # Instalar dependencias del frontend
   cd ../frontend
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la carpeta `backend` y añade las siguientes variables:
   ```
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
   PORT=3000
   CURRENCY_API_KEY=tu_clave_api_de_cambio_today
   BASE_URL_CURRENCY=https://api.cambio.today/v1/quotes
   ```

4. Configura la base de datos:
   ```
   cd backend
   npx prisma migrate dev
   ```

5. Inicia la aplicación:
   ```
   # Inicia el backend
   cd backend
   npm run dev

   # En otra terminal, inicia el frontend
   cd frontend
   npm run dev
   ```

## Uso

1. Abre tu navegador y ve a `http://localhost:5173` (o el puerto que Vite esté usando)
2. Serás recibido por la pantalla de bienvenida del Chat de Divisas
3. Ingresa tu nombre en el campo proporcionado
4. Haz clic en "Acceder al Chat" para entrar en la sala de chat principal
5. Comienza a chatear y usa el convertidor de divisas integrado según sea necesario

## Interfaz de Usuario

### Pantalla de Bienvenida

La aplicación comienza con una pantalla de bienvenida atractiva que introduce a los usuarios al Chat de Divisas:
![Captura](https://github.com/user-attachments/assets/7b9dfc6a-6c1b-40ac-9e48-3b6218fdb99c)



Características de la pantalla de bienvenida:
- Título prominente: "Bienvenido al Chat de Divisas"
- Breve descripción del propósito del chat
- Campo de entrada para que el usuario ingrese su nombre
- Botón "Acceder al Chat" para entrar a la sala principal
- Fondo con video relacionado a finanzas y trading (con imagen de respaldo)

#### Integración y Funcionamiento

La pantalla de bienvenida está implementada como un componente React llamado `WelcomeChat`. Aquí se detallan sus principales características y cómo se integra con el resto de la aplicación:

1. **Gestión del Estado**:
   - Utiliza el hook personalizado `useStore` para acceder y modificar el estado global de la aplicación.
   - Maneja localmente el estado del nombre ingresado usando `useState`.

2. **Validación del Nombre de Usuario**:
   - Implementa múltiples validaciones para asegurar un nombre de usuario válido:
     - No permite nombres vacíos
     - Requiere una longitud mínima de 3 caracteres
     - Solo permite letras y números en el nombre

3. **Manejo del Envío del Formulario**:
   - Previene el comportamiento por defecto del formulario.
   - Realiza las validaciones mencionadas antes de procesar el nombre.
   - Si el nombre es válido, lo establece en el estado global usando `setUserName`.

4. **Transición al Chat**:
   - Utiliza `useEffect` para detectar cambios en el nombre de usuario.
   - Cuando se establece un nombre válido, cambia el estado `chatStarted` a `true`.
   - Este cambio de estado desencadena la renderización del componente principal de chat.

5. **Diseño Responsivo**:
   - Utiliza Tailwind CSS para un diseño adaptable.
   - Incluye un video de fondo en dispositivos más grandes y lo oculta en móviles.

6. **Accesibilidad**:
   - Incluye etiquetas y atributos para mejorar la accesibilidad del formulario.

### Componente Principal de Chat

El componente `Chat` es el núcleo de la interfaz de usuario de la aplicación:

```jsx
const Chat = () => {
  return (
    <div className="rounded-lg flex justify-center items-center w-[150vh] bg-gray-100">
      <div className="bg-white rounded-lg shadow p-4 my-4 w-[140vh]">
        <div className="flex flex-col h-[80vh] overflow-y-auto">
          <MessageList />
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
```

Características clave:
- Utiliza Tailwind CSS para estilos responsivos
- Implementa un diseño de columna flexible con desplazamiento vertical
- Incluye dos componentes principales: `MessageList` y `MessageInput`

## Servicio de Conversión de Divisas

El proyecto utiliza un servicio personalizado para manejar las conversiones de divisas. Este servicio se comunica con la API de cambio.today para obtener tasas de cambio en tiempo real.

### Características del Servicio de Divisas

- Conversión entre múltiples pares de divisas
- Manejo de errores y logging
- Tipado fuerte con TypeScript

### Ejemplo de Uso

```typescript
import currencyService from './services/currencyService';

// Convertir 100 USD a EUR
const result = await currencyService('USD', 'EUR', 100);
console.log(result);
```

### Estructura de la Respuesta

El servicio devuelve un objeto `Currency` con la siguiente estructura:

```typescript
interface Currency {
  update: string;
  value: number;
  from: string;
  to: string;
  amount: number;
  quantity: number;
}
```

## API de Conversión de Divisas (cambio.today)

Este proyecto utiliza la API de cambio.today para obtener tasas de cambio en tiempo real.

### Configuración de la API

La clave API y la URL base se configuran a través de variables de entorno:

```javascript
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY || "tu_clave_api_por_defecto";
const BASE_URL_CURRENCY = process.env.BASE_URL_CURRENCY || "https://api.cambio.today/v1/quotes";
```

### Endpoints Utilizados

- `GET /{from}/{to}/json`: Obtiene la tasa de cambio entre dos divisas

Para más detalles sobre la API de cambio.today, consulta su [documentación oficial](https://cambio.today/api/docs).

## Almacenamiento de Datos

La aplicación utiliza una base de datos PostgreSQL alojada en la nube para almacenar información crucial sobre las interacciones de los usuarios.

### Estructura de la Base de Datos

La base de datos está diseñada para almacenar:
- Peticiones realizadas por cada usuario
- Posibles errores encontrados durante las interacciones
- Historial de conversiones de divisas

### Tecnologías Utilizadas

1. **PostgreSQL**: Base de datos relacional robusta y confiable.
2. **Prisma ORM**: Utilizado para interactuar con la base de datos de manera eficiente y segura.
3. **Migraciones**: Implementadas para gestionar y versionar los cambios en el esquema de la base de datos.

### Configuración de Prisma

Para configurar Prisma en el proyecto:

1. Instalar Prisma CLI:
   ```
   npm install prisma --save-dev
   ```

2. Inicializar Prisma en el proyecto:
   ```
   npx prisma init
   ```

3. Definir el esquema de la base de datos en `prisma/schema.prisma`.

4. Generar el cliente de Prisma:
   ```
   npx prisma generate
   ```

### Migraciones

Para crear una nueva migración:
```
npx prisma migrate dev --name nombre_de_la_migracion
```

Para aplicar migraciones en producción:
```
npx prisma migrate deploy
```

### Ejemplo de Modelo de Datos

```prisma
model UserRequest {
  id        Int      @id @default(autoincrement())
  userId    String
  request   String
  timestamp DateTime @default(now())
  error     String?
}
```

### Seguridad y Privacidad

- Todos los datos sensibles se almacenan de forma segura y encriptada.
- Se implementan prácticas de seguridad recomendadas por Prisma y PostgreSQL.
- El acceso a la base de datos está restringido y protegido por credenciales seguras.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### Backend

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila el proyecto
- `npm start`: Inicia el servidor en modo producción

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo de Vite
- `npm run build`: Compila el proyecto para producción
- `npm run preview`: Previsualiza la versión de producción localmente

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.
