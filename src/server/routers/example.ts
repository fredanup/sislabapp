import { prisma } from "server/prisma";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "server/trpc";
import { createProductSchema, editProductSchema, productSchema } from "utils/auth";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
    //Obtener todos los ejemplares de la sucursal del usuario actual
    findUserExamples: publicProcedure.input(z.string()).query(async ({input}) => {      
      const examples = await prisma.example.findMany({
        where:{
          branchId:input
        },
        select: {
          id: true,
          isAvailable: true,
          Product: {
            select: {
              name: true,
              Laboratory: {
                select: {
                  name: true,
                }
              },
              Presentation: {
                select: {
                  presentation: true
                }
              },
              quantity: true,
              price: true
            }
          },
        },
        
      });
      return examples;
    }),
  
    findOne: publicProcedure.input(z.string()).query(async ({ input }) => {
      const example = await prisma.example.findUnique({ where: { id: input } });
      return example;
    }),

    createExample: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.create({          
          data: {                
              name: input.name,                
              quantity: input.quantity,
              price:input.price,
              laboratoryId:input.laboratoryId, 
              presentationId:input.presentationId,   
              
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

    updateExample: protectedProcedure
      .input(editProductSchema)
      .mutation(async ({ ctx, input }) => {
        try {
          await ctx.prisma.product.update({
            where: { id: input.id },
            data: {                
                name: input.name,                
                quantity: input.quantity,
                price:input.price,
                laboratoryId:input.laboratoryId, 
                presentationId:input.presentationId,   
            },
          });
        } catch (error) {
          console.log(error);
        }
      }),

    deleteOne:  protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.delete({
          where: { id: input.id },
        });
        
      } catch (error) {
        console.log(error);
      }
    }),
  });