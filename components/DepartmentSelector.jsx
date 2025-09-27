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

const departments = [
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Computer Science and Engineering", label: "Computer Science and Engineering" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Electronics and Communication Engineering", label: "Electronics and Communication Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Aerospace Engineering", label: "Aerospace Engineering" },
  { value: "Automobile Engineering", label: "Automobile Engineering" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Metallurgical and Materials Engineering", label: "Metallurgical and Materials Engineering" },
  { value: "Instrumentation Engineering", label: "Instrumentation Engineering" },
  { value: "Biotechnology Engineering", label: "Biotechnology Engineering" },
];


export function DepartmentSelector({ departmentName, initialValue }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(initialValue || "")
  React.useEffect(() => {
    departmentName(value)
  }, [value])
  React.useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='dark' asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          {value
            ? departments.find((framework) => framework.value === value)?.label
            : "Select Department"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark">
        <Command>
          <CommandInput placeholder="Search Department..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Department found.</CommandEmpty>
            <CommandGroup>
              {departments.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
