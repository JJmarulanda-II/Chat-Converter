import { PrismaClient } from "@prisma/client";
import { Logger } from "../interfaces/Logger";

const prisma = new PrismaClient();

export default class LoggerService {
  public async createLog(data: Logger): Promise<void> {
    await prisma.log.create({
      data: {
        Date: data.Date,
        Text: data.Text,
        TextResult: data.TextResult,
        Errores: data.Errores,
      },
    });
  }

  public async getLogs(): Promise<Logger[]> {
    return await prisma.log.findMany();
  }
}
