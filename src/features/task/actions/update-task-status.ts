"use server";

import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

const updateTaskStatus = async (id: string, status: TaskStatus) => {
  try {
    await prisma.task.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(taskPath);

  return toActionState("SUCCESS", "Status updated");
};

export { updateTaskStatus };
