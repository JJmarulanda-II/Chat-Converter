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
const currencyService_1 = __importDefault(require("./currencyService"));
const loggerService_1 = __importDefault(require("./loggerService"));
class SocketService {
    constructor() {
        this.keyWord = "convertir";
        this.loggerService = new loggerService_1.default();
    }
    extractTextCurrency(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggerText = {
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
                const to = match[4]; // Divisa de destino (ej: COP)
                console.log(`Convertir ${cantidad} de ${from} a ${to}`);
                try {
                    const currency = yield (0, currencyService_1.default)(from, to, cantidad);
                    // Loguear el resultado de la conversión.
                    loggerText.TextResult = `La conversión de ${cantidad} ${from} a ${to} es ${currency.amount}`;
                    this.loggerService.createLog(loggerText);
                    return `La conversión de ${cantidad} ${from} a ${to} es ${currency.amount}`;
                }
                catch (error) {
                    console.error("Error al obtener la conversión:", error);
                    loggerText.Errores = `Hubo un problema al obtener la conversión: ${error}`;
                    this.loggerService.createLog(loggerText);
                    return "Hubo un problema al obtener la conversión.";
                }
            }
            else {
                console.log("Formato de conversión no válido.");
                loggerText.Errores = "Formato de conversión no válido.";
                this.loggerService.createLog(loggerText);
                return `El mensaje "${text}" no cumple con el formato exigido. El formato correcto es: "convertir <cantidad> <divisaOrigen>-<divisaDestino>".`;
            }
        });
    }
}
exports.default = SocketService;
