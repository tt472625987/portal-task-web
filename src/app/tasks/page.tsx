import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TaskList } from "@/features/task/components/task-list";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="TasksPage" description="All your tasks at one place" />
      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TaskList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Page;
