"use client"

import { SpellBookCard } from "@/components/spell-book-card"
import SpellCreator from "@/components/spell-create"
import { trpc } from "@/server/client"

export default function Home() {
  // const spells = trpc.spells.get.useQuery()
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-evenly gap-y-10 p-20">
      <SpellCreator />
      <SpellBookCard />
    </main>
  )
}
