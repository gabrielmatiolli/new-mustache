import { env } from "../env";

const isProduction = env.NODE_ENV === "production";

// Lazy load para evitar importar ambos os módulos
const redis = isProduction
  ? await import("./redis-prod")
  : await import("./redis-dev");

export const { getCache, setCache, deleteCache, deleteCachePattern } = redis;