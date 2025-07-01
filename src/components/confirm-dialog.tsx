import { cloneElement, useActionState, useState } from "react";

import { Form } from "./form/form";
import { SubmitButton } from "./form/submit-button";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type Props = {
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }>;
  title?: string;
  description?: string;
};

const useConfirmDialog = ({
  action,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure your understand the consequences.",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const [actionState, setActionState] = useActionState(
    action,
    EMPTY_ACTION_STATE
  );

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form
            actionState={actionState}
            action={setActionState}
            onSuccess={handleSuccess}
          >
            <AlertDialogAction asChild>
              <SubmitButton label="Confirm" />
            </AlertDialogAction>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
