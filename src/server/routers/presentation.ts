import { prisma } from "server/prisma";
import { createTRPCRouter, publicProcedure } from "server/trpc";

export const presentationRouter = createTRPCRouter({
    //Listar a los usuarios con su sucursal adjunta
    findMany: publicProcedure.query(async () => {
      const presentations = await prisma.presentation.findMany();
      return presentations;
    }),
  });