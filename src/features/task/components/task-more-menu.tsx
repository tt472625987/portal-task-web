"use client";
import { Task, TaskStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { updateTaskStatus } from "../actions/update-task-status";
import { TASK_STATUS_LABELS } from "../constants";

type Props = {
  task: Task;
  trigger: React.ReactNode;
};

const TaskMoreMenu = ({ task, trigger }: Props) => {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  const handleUpdateTaskStatus = async (value: string) => {
    const promise = updateTaskStatus(task.id, value as Task["status"]);

    toast.promise(promise, {
      loading: "Updating Status...",
    });

    const result = await promise;
    if (result.status === "SUCCESS") {
      toast.success(result.message);
    } else if (result.status === "ERROR") {
      toast.error(result.message);
    }
  };

  const taskStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={task.status}
      onValueChange={handleUpdateTaskStatus}
    >
      {(Object.keys(TASK_STATUS_LABELS) as Array<TaskStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TASK_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {taskStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TaskMoreMenu };
