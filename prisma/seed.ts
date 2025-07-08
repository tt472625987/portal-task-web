import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
];

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
    await prisma.user.deleteMany();
    await prisma.task.deleteMany();

    const passwordHash = await hash("admin123");

    // 创建新任务
    const dnUser = await prisma.user.createManyAndReturn({
      data: initialUsers?.map((user) => ({ ...user, passwordHash })),
    });
    await prisma.task.createMany({
      data: initialTasks?.map((task) => ({
        ...task,
        userId: dnUser[0].id,
      })),
    });

    const t1 = performance.now();
    console.log(`DB Seed: Finished（${(t1 - t0).toFixed(1)}ms）`);
  } catch (err) {
    console.error("DB Seed: Error occurred", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
