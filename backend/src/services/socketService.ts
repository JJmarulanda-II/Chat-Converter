import { Currency } from "../interfaces/Currency";
import { Logger } from "../interfaces/Logger";
import currencyService from "./currencyService";
import LoggerService from "./loggerService";

export default class SocketService {
    private keyWord: string;
    private loggerService: LoggerService;

    constructor() {
        this.keyWord = "convertir";
        this.loggerService = new LoggerService();
    }

    public async extractTextCurrency(text: string): Promise<string> {

        const loggerText: Logger = {
            Date: new Date(), 
            Text: text,
            TextResult: '', 
            Errores: '' 
        };

        // Transformar el texto a minúsculas para mejorar la comparación.
        const textLowerCase = text.toLowerCase();

        // Si el texto no incluye la palabra clave, devolver un mensaje por defecto.
        if (!textLowerCase.includes(this.keyWord)) {
            loggerText.Errores = `El mensaje "${text}" no incluye la palabra clave "convertir".`;
            this.loggerService.createLog(loggerText);
            return `El mensaje "${text}" no incluye la palabra clave "convertir".`;
        }

        console.log(`El mensaje contiene la palabra clave: ${this.keyWord}`);

        // Extraer la cantidad y divisas usando una expresión regular.
        const regex = /convertir (\d+(\.\d+)?) (\w+)-(\w+)/;
        const match = text.match(regex);

        if (match) {
            const cantidad = parseFloat(match[1]);
            const from = match[3]; // Divisa de origen (ej: USD)
            const to = match[4];   // Divisa de destino (ej: COP)

            console.log(`Convertir ${cantidad} de ${from} a ${to}`);

            try {
                const currency: Currency = await currencyService(from, to, cantidad);
                // Loguear el resultado de la conversión.
                loggerText.TextResult = `La conversión de ${cantidad} ${from} a ${to} es ${currency.amount}`;
                this.loggerService.createLog(loggerText);
                return `La conversión de ${cantidad} ${from} a ${to} es ${currency.amount}`;
            } catch (error : unknown) {
                console.error("Error al obtener la conversión:", error);
                loggerText.Errores = `Hubo un problema al obtener la conversión: ${error}`;
                this.loggerService.createLog(loggerText);
                return "Hubo un problema al obtener la conversión.";
            }

        } else {
            console.log("Formato de conversión no válido.");
            loggerText.Errores = "Formato de conversión no válido.";
            this.loggerService.createLog(loggerText);
            return `El mensaje "${text}" no cumple con el formato exigido. El formato correcto es: "convertir <cantidad> <divisaOrigen>-<divisaDestino>".`;
        }
    }
}
