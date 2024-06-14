"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { trpc } from "@/server/client"
import Image from "next/image"
import React, { useRef, useState } from "react"

const SpellBookPage = ({ params }: { params: { spellbookId: number } }) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const spellbook = trpc.spellBooks.getSpellbookbyId.useQuery({
    id: params.spellbookId ?? 0,
  })

  const fileRef = useRef<HTMLInputElement>(null)

  const createSpell = trpc.spells.create.useMutation()

  const addSpell = () => {
    if (fileRef.current?.files) {
      const formData = new FormData()
      const file = fileRef.current.files[0]
      formData.append("files", file)
      const request = { method: "POST", body: formData }
      fetch("/api/file", request)
      createSpell.mutate(
        {
          title,
          description,
          spellbookId: params.spellbookId,
          image: `/${file.name}`,
        },
        {
          onSuccess: () => spellbook.refetch(),
        }
      )
      setTitle("")
      setDescription("")
    }
  }

  return (
    <div className="mt-10 m-4 flex flex-col items-center justify-between gap-y-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="default"
          >
            Create spell
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a spell</DialogTitle>
            <DialogDescription>Create your collection of spells</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-y-8">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Spell title"
            />
            <Input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="description"
            />
            <Input
              className="h-[4rem] bg-slate-200"
              ref={fileRef}
              type="file"
              placeholder="Upload image"
            />

            <Button
              onClick={addSpell}
              variant="default"
              size="default"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>Spells from {spellbook.data?.title}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spellbook.data?.spells.map((spell: any) => (
            <TableRow key={spell.id}>
              <TableCell className="font-medium">{spell.title}</TableCell>
              <TableCell>{spell.description}</TableCell>
              <TableCell>
                <Image
                  src={spell.image || ""}
                  width={50}
                  height={50}
                  alt="spell"
                />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="default"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

export default SpellBookPage
