import { db } from "@/utils/db"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

export const spellsRouter = router({
  get: publicProcedure.query(async () => {
    const spells = await db.spell.findMany()

    return spells
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        spellbookId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts
      await db.spell.create({
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          spellbookId: input.spellbookId,
        },
      })
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts
      await db.spell.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
