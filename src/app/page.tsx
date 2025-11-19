import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TaskList } from "@/features/task/components/task-list";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="All Tasks!"
        description="Tasks by everyone at one place"
      />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TaskList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
