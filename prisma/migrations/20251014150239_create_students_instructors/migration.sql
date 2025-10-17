/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."user_type" AS ENUM ('STUDENT', 'INSTRUCTOR');

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_type" "public"."user_type" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."instructor" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "formation" TEXT NOT NULL,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."student" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "public"."user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_rg_key" ON "public"."user"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_user_id_key" ON "public"."instructor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_user_id_key" ON "public"."student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_student_id_key" ON "public"."student"("student_id");

-- AddForeignKey
ALTER TABLE "public"."instructor" ADD CONSTRAINT "instructor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
