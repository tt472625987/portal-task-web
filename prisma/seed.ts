import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialTasks = [
  {
    title: "Task 1",
    description: "Description 1 from seed",
    status: "DONE" as const,
    deadline: "2025-12-31",
    bounty: 0,
  },
];

async function seed() {
  const t0 = performance.now();
  console.log("DB Seed: Start ... ");

  try {
    // 清空旧任务
    await prisma.task.deleteMany();

    // 创建新任务
    await prisma.task.createMany({ data: initialTasks });

    const t1 = performance.now();
    console.log(`DB Seed: Finished（${(t1 - t0).toFixed(1)}ms）`);
  } catch (err) {
    console.error("DB Seed: Error occurred", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
