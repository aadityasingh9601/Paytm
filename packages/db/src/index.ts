//It's a good practice to export everything from a file like this, so that other modules outside it can import
//them.

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

//You can export the prisma with any name you want, currently we're exporting @prisma/client as db, when we finish creating
//this file, we'll just export the prisma client.
