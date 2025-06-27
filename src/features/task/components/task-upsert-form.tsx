"use client";
import { useActionState } from "react";
import React from "react";

import { FieldError } from "@/components/form/field-error";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
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
    EMPTY_ACTION_STATE
  );

  // const upsertTaskAction = (formData: FormData) => {
  //   startTransition(async () => {
  //     // await upsertTask.bind(null, task?.id)(formData);
  //     await upsertTask(task?.id, formData);
  //   });
  // };

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      console.info(actionState.message);
    },
    onError: ({ actionState }) => {
      console.info(actionState.message);
    },
  });

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
      <FieldError actionState={actionState} name="title" />

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
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={task?.id ? "Update" : "Create"} />

      {actionState?.message}
    </form>
  );
};

export { TaskUpsertForm };
