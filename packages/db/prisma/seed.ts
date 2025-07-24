import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // const alice = await prisma.user.upsert({
  //   where: { number: 111111111, email: "abc@gmail.com" },

  //   update: {},
  //   create: {
  //     number: 111111111,
  //     password: await bcrypt.hash("alice", 10),
  //     email: "abc@gmail.com",
  //     name: "alice",
  //     Balance: {
  //       create: {
  //         amount: 20000,
  //         locked: 0,
  //       },
  //     },
  //     OnRampTransaction: {
  //       create: {
  //         startTime: new Date(),
  //         status: "Success",
  //         amount: 20000,
  //         token: "token__1",
  //         provider: "HDFC Bank",
  //       },
  //     },
  //   },
  // });
  const bob = await prisma.user.upsert({
    where: { number: 222222222, email: "pqr@gmail.com" },
    update: {},
    create: {
      number: 222222222,
      password: await bcrypt.hash("bob", 10),
      name: "bob",
      email: "pqr@gmail.com",
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
