//It's a good practice to export everything from a file like this, so that other modules outside it can import
//them.

import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
  return new PrismaClient();
};

export * as db from "@prisma/client";

//You can export the prisma with any name you want, currently we're exporting @prisma/client as db, when we finish creating
//this file, we'll just export the prisma client.
