import axios from "axios";
import { Currency } from "../interfaces/Currency";

const CURRENCY_API_KEY =
  process.env.CURRENCY_API_KEY || "54902|NUW1vTVQthJiWzW6voqg";
const BASE_URL_CURRENCY =
  process.env.BASE_URL_CURRENCY || "https://api.cambio.today/v1/quotes";

const currencyService = async (
  from: string,
  to: string,
  quantity: number = 1
) => {
  try {
    const URL = `${BASE_URL_CURRENCY}/${from.toUpperCase()}/${to.toUpperCase()}/json?quantity=${quantity}&key=${CURRENCY_API_KEY}`;
    const response = await axios.get<any>(URL);
    console.log(response.data.result);
    const result = response.data.result;

    const responseCurrency: Currency = {
      update: result.updated,
      value: result.value,
      from: result.source,
      to: result.target,
      amount: result.amount,
      quantity: result.quantity,
    };

    return responseCurrency;
  } catch (error: unknown) {
    console.error("Error fetching currency data:", error);
    throw error;
  }
};

export default currencyService;
