import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

// Esquema de validação para variáveis de ambiente
const envSchema = z.object({
  // Node
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Database - Neon PostgreSQL
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória"),
  DATABASE_URL_UNPOOLED: z.string().optional(),

  // PostgreSQL Parameters (opcionais, fornecidos pelo Neon)
  PGHOST: z.string().optional(),
  PGHOST_UNPOOLED: z.string().optional(),
  PGUSER: z.string().optional(),
  PGDATABASE: z.string().optional(),
  PGPASSWORD: z.string().optional(),

  // Vercel Postgres Templates
  POSTGRES_URL: z.string().optional(),
  POSTGRES_URL_NON_POOLING: z.string().optional(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_HOST: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DATABASE: z.string().optional(),
  POSTGRES_URL_NO_SSL: z.string().optional(),
  POSTGRES_PRISMA_URL: z.string().optional(),

  // JWT Secret
  JWT_SECRET: z.string().min(8, "JWT_SECRET deve ter no mínimo 8 caracteres"),

  // Comtele API
  COMTELE_API_KEY: z.string().min(1, "COMTELE_API_KEY é obrigatória"),

  // Vercel Blob Storage
  BLOB_READ_WRITE_TOKEN: z
    .string()
    .min(1, "BLOB_READ_WRITE_TOKEN é obrigatório"),

  // Next.js Public Variables
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

// Carrega as variáveis de ambiente antes de validar
export function loadEnvs() {
  // Carrega as variáveis de ambiente na ordem correta
  // .env.local tem prioridade sobre .env.development
  const nodeEnv = process.env.NODE_ENV || "development";

  // Carrega .env.local primeiro (maior prioridade)
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

  // Depois carrega .env.development ou .env.production se existir
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${nodeEnv}`) });

  // Por último carrega .env (menor prioridade)
  dotenv.config();
}

// Validação e parse das variáveis de ambiente
function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Erro na validação das variáveis de ambiente:",
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
    );
    throw new Error("Variáveis de ambiente inválidas. Verifique o .env.local");
  }

  return parsed.data;
}

// Função para obter as variáveis validadas (chame após loadEnvs)
function getEnv() {
  return validateEnv();
}

// Exporta as variáveis de ambiente validadas (lazy loading)
// IMPORTANTE: Apenas use após chamar loadEnvs() ou em runtime (não em módulos config)
let _env: z.infer<typeof envSchema> | null = null;

export const env = new Proxy({} as z.infer<typeof envSchema>, {
  get(_, prop) {
    if (!_env) {
      _env = getEnv();
    }
    return _env[prop as keyof typeof _env];
  }
});

// Type-safe para autocomplete
export type Env = z.infer<typeof envSchema>;
