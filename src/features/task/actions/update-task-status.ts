"use server";

import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

const updateTaskStatus = async (id: string, status: TaskStatus) => {
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

    await prisma.task.update({
      where: {
        id,
        // userId: user.id
      },
      data: { status },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(taskPath);

  return toActionState("SUCCESS", "Status updated");
};

export { updateTaskStatus };
