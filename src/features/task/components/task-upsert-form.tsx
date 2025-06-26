"use client";
import { useActionState } from "react";
import React from "react";

import { SubmitButton } from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { upsertTask } from "../actions/upsert-task";
import { getTask } from "../queries/get-task";

type Props = {
  task?: Awaited<ReturnType<typeof getTask>>;
};

const TaskUpsertForm = ({ task }: Props) => {
  // const [isPending, startTransition] = useTransition();

  const [actionState, action] = useActionState(
    upsertTask.bind(null, task?.id),
    {
      message: "",
    }
  );

  // const upsertTaskAction = (formData: FormData) => {
  //   startTransition(async () => {
  //     // await upsertTask.bind(null, task?.id)(formData);
  //     await upsertTask(task?.id, formData);
  //   });
  // };

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState?.payload?.get("title") as string) || task?.title
        }
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState?.payload?.get("content") as string) ||
          task?.description ||
          ""
        }
      />

      <SubmitButton label={task?.id ? "Update" : "Create"} />

      {actionState?.message}
    </form>
  );
};

export { TaskUpsertForm };
