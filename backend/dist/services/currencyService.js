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
const axios_1 = __importDefault(require("axios"));
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY || "54902|NUW1vTVQthJiWzW6voqg";
const BASE_URL_CURRENCY = process.env.BASE_URL_CURRENCY || "https://api.cambio.today/v1/quotes";
const currencyService = (from_1, to_1, ...args_1) => __awaiter(void 0, [from_1, to_1, ...args_1], void 0, function* (from, to, quantity = 1) {
    try {
        const URL = `${BASE_URL_CURRENCY}/${from.toUpperCase()}/${to.toUpperCase()}/json?quantity=${quantity}&key=${CURRENCY_API_KEY}`;
        const response = yield axios_1.default.get(URL);
        console.log(response.data.result);
        const result = response.data.result;
        const responseCurrency = {
            update: result.updated,
            value: result.value,
            from: result.source,
            to: result.target,
            amount: result.amount,
            quantity: result.quantity,
        };
        return responseCurrency;
    }
    catch (error) {
        console.error("Error fetching currency data:", error);
        throw error;
    }
});
exports.default = currencyService;
