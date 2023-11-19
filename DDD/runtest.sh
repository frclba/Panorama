rm -rf ./src/infrastructure/prisma/test.db
bun prisma-migrate
bun prisma-generate
bun test