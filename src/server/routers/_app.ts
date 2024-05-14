/**
 * This file contains the root router of your tRPC-backend
 */
import {createTRPCRouter, publicProcedure } from '../trpc';
import { observable } from '@trpc/server/observable';
import { clearInterval } from 'timers';
import { userRouter } from './user';
import { branchRouter } from './branch';

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => 'yay!'),
  user: userRouter,
  branch: branchRouter,
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
