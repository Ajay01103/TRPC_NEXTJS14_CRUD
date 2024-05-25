"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { trpc } from "@/server/client"

export function SpellBookCard() {
  const spellbooks = trpc.spellBooks.get.useQuery()
  const deleteSpellbook = trpc.spellBooks.delete.useMutation()

  const delSpellbook = (id: number) => {
    deleteSpellbook.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          spellbooks.refetch()
        },
      }
    )
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spellbooks.data?.map((spellbook) => (
        <Card
          key={spellbook.id}
          className="w-[358px]"
        >
          <CardHeader>
            <CardTitle>{spellbook.title}</CardTitle>
            <CardDescription>{spellbook.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="framework">Spells</Label>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => delSpellbook(spellbook.id)}
              variant="outline"
            >
              delete
            </Button>
            <Button>Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
