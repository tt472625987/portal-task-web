import Link from "next/link";

import { Heading } from "@/components/heading";
import { taskPath } from "@/paths";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Welcome to TaskBounty"
        description="Your task management solution"
      />

      <div className="flex-1 flex flex-col items-center">
        <Link className="underline" href={taskPath}>
          Go to Tasks
        </Link>
      </div>
    </div>
  );
}
