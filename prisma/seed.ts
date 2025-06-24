import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

const initialTasks = [
  {
    title: "Task 1",
    description: "Description 1",
    status: "DONE" as const,
  },
  {
    title: "Task 2",
    description: "Description 2",
    status: "OPEN" as const,
  },
  {
    title: "Task 3",
    description: "Description 3",
    status: "IN_PROGRESS" as const,
  },
];

async function seed() {
  const t0 = performance.now();
  console.log("DB Seed: Start ... ");
  await Prisma.task.deleteMany();
  await Prisma.task.createMany({ data: initialTasks });
  const t1 = performance.now();
  console.log(`DB Seed: Finished（${t1 - t0}ms）`);
}

seed();
