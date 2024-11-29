"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api } from "@/app/_trpc/client"


type Props = {
  value : string,
  setValue : React.Dispatch<React.SetStateAction<string>>
}

 const RoomsComboBox:React.FC<Props> = ({ value, setValue }) => {
  const { data } = api.rooms.getAllAvailableRoom.useQuery();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-secondary"
        >
          {value
            ? data && data.find((room) => room.value === value)?.label
            : "Search room no."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search room no." />
          <CommandList>
            <CommandEmpty>No Room found.</CommandEmpty>
            <CommandGroup>
              {data && data.map((room) => (
                <CommandItem
                  key={room.value}
                  value={room.value}
                  onSelect={(room) => {
                    setValue(room === value ? "" : room)
                    setOpen(false)
                  }}    
                >
                  {room.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === room.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default RoomsComboBox;