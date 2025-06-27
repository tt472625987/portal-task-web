"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { Prisma } from "@/lib/prisma";
import { taskDetailPath, taskPath } from "@/paths";

const upsertTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(191, "Title must be less than 191 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content must be less than 1024 characters"),
});

export const upsertTask = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertTaskSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await Prisma.task.upsert({
      where: { id: id || "" },
      create: {
        title: data.title as string,
        description: data.content as string,
      },
      update: {
        title: data.title as string,
        description: data.content as string,
      },
    });
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  revalidatePath(taskPath);
  if (id) {
    redirect(taskDetailPath(id));
  }

  return toActionState(
    "SUCCESS",
    id ? "Task Update successfully" : "Task Create successfully"
  );
};
