import { Redis } from "@upstash/redis";
import { loadEnvs } from "../env";

loadEnvs();

// Upstash Redis é serverless e não requer conexão explícita
const redis = Redis.fromEnv();

// Cache helper functions
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    // Upstash automaticamente parseia JSON
    const data = await redis.get<T>(key);
    return data;
  } catch (error) {
    console.error("Erro ao buscar cache:", error);
    return null;
  }
}

export async function setCache(
  key: string,
  value: string | object,
  ttl: number = 3600 // TTL padrão: 1 hora
): Promise<void> {
  try {
    // Upstash automaticamente serializa para JSON
    await redis.setex(key, ttl, value);
  } catch (error) {
    console.error("Erro ao salvar cache:", error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Erro ao deletar cache:", error);
  }
}

export async function deleteCachePattern(pattern: string): Promise<void> {
  try {
    let cursor: string | number = 0;
    do {
      const result: [string | number, string[]] = await redis.scan(cursor, {
        match: pattern,
        count: 100,
      });
      cursor = result[0];
      const keys = result[1];
      
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== 0);
  } catch (error) {
    console.error("Erro ao deletar cache por pattern:", error);
  }
}

export { redis };
