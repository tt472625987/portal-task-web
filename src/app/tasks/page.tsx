import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TaskList } from "@/features/task/components/task-list";
import { TaskUpsertForm } from "@/features/task/components/task-upsert-form";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="TasksPage" description="All your tasks at one place" />

      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create Task"
        description="A new task will be created"
        content={<TaskUpsertForm />}
      />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TaskList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Page;
