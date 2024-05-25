import { spellBooksRouter } from "./routes/spellBooks"
import { spellsRouter } from "./routes/spells"
import { router } from "./trpc"

export const appRouter = router({
  spells: spellsRouter,
  spellBooks: spellBooksRouter,
})

export type AppRouter = typeof appRouter
