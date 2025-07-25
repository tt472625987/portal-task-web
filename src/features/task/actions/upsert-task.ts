"use server";
import { omit } from "lodash-es";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { taskDetailPath, taskPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(191, "Title must be less than 191 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content must be less than 1024 characters"),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "IS required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTask = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    // 先根据id查询task，然后判断task的userId是否是现在登录的用户，如果不是，则抛出异常
    if (id) {
      const task = await prisma.task.findUnique({
        where: { id },
      });

      if (!task || !isOwner(user, task)) {
        return toActionState("ERROR", "Not authorized");
      }
    }

    const data = upsertTaskSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...omit(data, "content"),
      userId: user.id,
      description: data.content,
      bounty: toCent(data.bounty),
    };

    await prisma.task.upsert({
      where: { id: id || "" },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  revalidatePath(taskPath);
  if (id) {
    await setCookieByKey("toast", "Task Update successfully");
    redirect(taskDetailPath(id));
  }

  return toActionState(
    "SUCCESS",
    id ? "Task Update successfully" : "Task Create successfully"
  );
};
