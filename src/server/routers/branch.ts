import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { prisma } from 'server/prisma';
import { editUserBranchSchema, userBranchSchema } from 'utils/auth';

import { z } from 'zod';

export const branchRouter = createTRPCRouter({
  //Listar a los usuarios con su sucursal adjunta
  findMany: publicProcedure.query(async () => {
    const branchs = await prisma.branch.findMany();
    return branchs;
  }),
});