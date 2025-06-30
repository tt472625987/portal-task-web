"use client";
import { useActionState } from "react";
import React from "react";

import { DatePicker } from "@/components/date-pick";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from "@/utils/currency";

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

  return (
    <Form
      className="flex flex-col gap-y-2"
      actionState={actionState}
      action={action}
    >
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

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>

          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState?.payload?.get("deadline") as string) ??
              task?.deadline
            }
          />
          {/* <Input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={
              (actionState?.payload?.get("deadline") as string) ??
              task?.deadline
            }
          /> */}
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty（$）</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step="0.01"
            defaultValue={
              (actionState?.payload?.get("bounty") as string) ??
              (task?.bounty ? fromCent(task?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={task?.id ? "Update" : "Create"} />
    </Form>
  );
};

export { TaskUpsertForm };
