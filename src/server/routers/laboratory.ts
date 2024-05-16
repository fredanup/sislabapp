import { prisma } from "server/prisma";
import { createTRPCRouter, publicProcedure } from "server/trpc";

export const laboratoryRouter = createTRPCRouter({
    //Listar a los usuarios con su sucursal adjunta
    findMany: publicProcedure.query(async () => {
      const laboratories = await prisma.laboratory.findMany();
      return laboratories;
    }),
  });