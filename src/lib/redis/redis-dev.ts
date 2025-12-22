import { createClient } from "redis";
import { env, loadEnvs } from "../env";

loadEnvs();

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Conecta ao Redis
let isConnected = false;

async function connect() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
    console.log("✅ Redis conectado");
  }
}

// Cache helper functions
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    await connect();
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
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
    await connect();
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error("Erro ao salvar cache:", error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await connect();
    await redisClient.del(key);
  } catch (error) {
    console.error("Erro ao deletar cache:", error);
  }
}

export async function deleteCachePattern(pattern: string): Promise<void> {
  try {
    await connect();
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error("Erro ao deletar cache por pattern:", error);
  }
}

export { redisClient };
