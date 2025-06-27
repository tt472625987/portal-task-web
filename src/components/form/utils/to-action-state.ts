import { z } from "zod";

export type ActionState = {
  timestamp: number;
  message: string;
  fieldError: Record<string, string[] | undefined>;
  status?: "SUCCESS" | "ERROR";
  payload?: FormData;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldError: {},
  timestamp: Date.now(),
};

export const formErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  // case1，zod error
  if (error instanceof z.ZodError) {
    return {
      message: "",
      status: "ERROR",
      fieldError: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  }

  // case2, prisma error
  if (error instanceof Error) {
    return {
      status: "ERROR",
      message: "Error: " + error.message,
      payload: formData,
      fieldError: {},
      timestamp: Date.now(),
    };
  }

  // case3, unknown error
  return {
    status: "ERROR",
    message: "Error: An unexpected error occurred",
    payload: formData,
    fieldError: {},
    timestamp: Date.now(),
  };
};

export const toActionState = (
  status: ActionState["status"],
  message: string
): ActionState => {
  return {
    status,
    message,
    fieldError: {},
    timestamp: Date.now(),
  };
};
