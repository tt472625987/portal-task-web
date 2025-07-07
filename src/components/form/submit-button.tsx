"use client";
import clsx from "clsx";
import { LucideLoaderCircle } from "lucide-react";
import React, { cloneElement } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  icon?: React.ReactElement<{
    className?: string;
  }>;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "destructive"
    | "link"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
};

const SubmitButton = (props: Props) => {
  const { label, icon, variant, size } = props;
  const { pending } = useFormStatus();
  // const pending = true;

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={clsx("animate-spin h-4 w-4", {
            "mr-2": !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span
          className={clsx({
            "ml-2": !!label,
          })}
        >
          {cloneElement(icon, {
            className: "h-4 w-4",
          })}
        </span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };
