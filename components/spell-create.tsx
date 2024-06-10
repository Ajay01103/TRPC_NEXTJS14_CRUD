"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { trpc } from "@/server/client"
import { useRouter } from "next/navigation"

const SpellCreator = () => {
  const spellbooks = trpc.spellBooks.get.useQuery()
  const addSpellbook = trpc.spellBooks.create.useMutation()

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const addNewSpellBook = () => {
    addSpellbook.mutate(
      {
        title,
        description,
      },
      {
        onSuccess: () => {
          setTitle("")
          setDescription("")
          setIsOpen(false)
          spellbooks.refetch()
        },
      }
    )
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button variant="default">Create Spellbook</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Spellbook</DialogTitle>
            <DialogDescription>
              Create your own Spellbook recipie here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right"
              >
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right"
              >
                description
              </Label>
              <Input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={addNewSpellBook}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SpellCreator
