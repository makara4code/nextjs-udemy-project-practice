# Notes

Everytimes prisma schema is changes we need to generate new prisma client and create new migration.

```bash
npx prisma generate
npx prisma migrate dev --name migration_name
```

To open prisma studio `npx prisma studio`

To Seed Database: `npx tsx ./db/seed.ts`

To generate secre: `openssl rand -base64 32`
