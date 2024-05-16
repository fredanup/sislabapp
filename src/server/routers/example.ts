import { prisma } from "server/prisma";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "server/trpc";
import { createProductSchema, editProductSchema, productSchema } from "utils/auth";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
    //Listar a los usuarios con su sucursal adjunta
    findManyExample: publicProcedure.query(async () => {
      const examples = await prisma.example.findMany({
        select:{
          id:true,
          move_type:true,
          move_date:true,
          move_state:true,
          productId:true,
          Product:true,
          saleId:true,
          Sale:true,
          provenanceId:true,
          Provenance:true,
          destinationId:true,
          Destination:true

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