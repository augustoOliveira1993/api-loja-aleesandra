import { logger } from '@shared/utils/logger';
import crypto from 'crypto';
import Redis from 'ioredis';

export default class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: Number(process.env.REDIS_DB) || 0,
        tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
      });

      this.instance.on('connect', () => {
        console.log('Redis conectado com sucesso!');
      });

      this.instance.on('error', err => {
        console.error('Erro ao conectar ao Redis:', err);
      });
    }
    return this.instance;
  }

  /**
   * Gera uma chave de cache dinâmica.
   * @param prefix Prefixo base do cache.
   * @param routeParams Parâmetros da rota.
   * @param queryParams Query params.
   * @returns Chave única para o cache.
   */
  public static getDynamicHashKey(
    prefix: string,
    routeParams: object = {},
    queryParams: object = {},
  ): string {
    const routeHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(routeParams))
      .digest('hex');
    const queryHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(queryParams))
      .digest('hex');
    return `CACHE${prefix}:${routeHash}:${queryHash}`;
  }

  public static async getCache(hashKey: string): Promise<any | null> {
    const redis = this.getInstance();
    if (!redis) return
    const cachedData = await redis.get(hashKey);
    if (!cachedData) return null;
    logger.info(`HIT: ${hashKey}`);
    return JSON.parse(cachedData);
  }

  public static async setCache(
    hashKey: string,
    data: any,
    expiration?: number,
  ): Promise<void> {
    const redis = this.getInstance();
    if (!redis) return
    logger.info(`MISS: ${hashKey}`);
    if (expiration) {
      await redis.set(hashKey, JSON.stringify(data), 'EX', expiration);
    } else {
      await redis.set(hashKey, JSON.stringify(data));
    }
  }

  public static async deleteCache(hashKey: string): Promise<void> {
    const redis = this.getInstance();
    if (!redis) return
    await redis.del(hashKey);
  }

  public static async clearCacheByPrefix(prefix: string): Promise<void> {
    const redis = this.getInstance();
    if (!redis) return
    let cursor = '0';
    do {
      const result = await redis.scan(
        cursor,
        'MATCH',
        `CACHE${prefix}:*`,
        'COUNT',
        100,
      );
      cursor = result[0];
      const keys = result[1];
      if (keys.length > 0) {
        await redis.del(...keys);

      }
    } while (cursor !== '0');
    logger.info(`Todos os caches com o prefixo "${prefix}" foram removidos.`);
  }
}
