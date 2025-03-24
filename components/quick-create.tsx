"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IconCirclePlusFilled } from "@tabler/icons-react"

type CreateType = "teamMember" | "project" | "task"

export function QuickCreate() {
  const [open, setOpen] = useState(false)
  const [createType, setCreateType] = useState<CreateType | null>(null)

  // When an option is selected, save the type and open the modal
  const handleSelect = (type: CreateType) => {
    setCreateType(type)
    setOpen(true)
  }

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Process form data as needed.
    setOpen(false)
  }

  // Render a different form based on the selected createType
  const renderForm = () => {
    switch (createType) {
      case "teamMember":
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Team Member Name</label>
              <Input type="text" placeholder="Enter name" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Enter email" required />
            </div>
            <Button type="submit">Create Team Member</Button>
          </form>
        )
      case "project":
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Project Name</label>
              <Input type="text" placeholder="Enter project name" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Enter description" required />
            </div>
            <Button type="submit">Create Project</Button>
          </form>
        )
      case "task":
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Title</label>
              <Input type="text" placeholder="Enter task title" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" required />
            </div>
            <Button type="submit">Create Task</Button>
          </form>
        )
      default:
        return null
    }
  }

  return (
    <div className="">
      {/* Dropdown for Quick Create options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear bgcolo w-55">
          <IconCirclePlusFilled />
            Quick Create
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => handleSelect("teamMember")}>
            Create Team Member
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("project")}>
            Create Project
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("task")}>
            Create Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal dialog for the form */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Invisible trigger since we're controlling the modal via state */}
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {createType === "teamMember" && "Create Team Member"}
              {createType === "project" && "Create Project"}
              {createType === "task" && "Create Task"}
            </DialogTitle>
            <DialogDescription>
              {createType === "teamMember" &&
                "Fill in the details to add a new team member."}
              {createType === "project" &&
                "Fill in the details to start a new project."}
              {createType === "task" &&
                "Fill in the details to add a new task."}
            </DialogDescription>
          </DialogHeader>
          {renderForm()}
          <DialogClose asChild>
            <Button variant="ghost" className="mt-4">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
