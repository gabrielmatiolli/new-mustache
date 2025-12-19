import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { env, loadEnvs } from "./env";
import { PrismaClient } from "../../prisma/generated/prisma";

loadEnvs();

const connectionString = `${env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }