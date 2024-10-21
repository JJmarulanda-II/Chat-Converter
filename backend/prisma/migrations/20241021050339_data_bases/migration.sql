-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Text" TEXT NOT NULL,
    "TextResult" TEXT NOT NULL,
    "Errores" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
