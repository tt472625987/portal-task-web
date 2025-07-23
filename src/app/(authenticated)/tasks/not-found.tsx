import Link from "next/link";

import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { taskPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="Task not found"
      button={
        <Button asChild variant="outline">
          <Link href={taskPath}>Go To Tasks</Link>
        </Button>
      }
    />
  );
}
