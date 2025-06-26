import { z } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
};

export const formErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  // case1，zod error
  if (error instanceof z.ZodError) {
    return {
      message: "Error: " + error.errors.map((e) => e.message).join(", "),
      payload: formData,
    };
  }

  // case2, prisma error
  if (error instanceof Error) {
    return {
      message: "Error: " + error.message,
      payload: formData,
    };
  }

  // case3, unknown error
  return {
    message: "Error: An unexpected error occurred",
    payload: formData,
  };
};
