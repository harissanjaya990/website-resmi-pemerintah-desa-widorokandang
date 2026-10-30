# WEBSITE RESMI PEMERINTAH DESA WIDOROKANDANG

A modern full-stack government website for Desa Widorokandang built with Next.js, Tailwind CSS, Prisma, and PostgreSQL.

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Bcrypt password hashing
- Protected admin pages with cookie-based sessions

## Local setup
1. Copy `.env.example` to `.env`
2. Update the database and SMTP values
3. Run `npm install`
4. Run `npx prisma generate`
5. Run `npx prisma migrate dev --name init`
6. Run `npm run prisma:seed`
7. Run `npm run dev`

## Default admin account
- Username: `Admin1`
- Password: `Admin01`

The admin account will be forced to change password after first login.
