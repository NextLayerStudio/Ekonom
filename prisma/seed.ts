import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@happygold.sk";
  const password = process.env.ADMIN_PASSWORD ?? "zmenmaheslo123";
  const name = process.env.ADMIN_NAME ?? "Happy Gold";

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed, name },
  });

  console.log(`✔ Admin používateľ pripravený: ${user.email}`);
  console.log(`  Heslo: ${password}  (zmeňte cez ADMIN_PASSWORD)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
