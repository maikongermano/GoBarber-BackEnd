import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    // salvando no redis
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    // busca informação
    const data = await this.client.get(key);

    // se nao econtrar nada retorna nulo
    if (!data) {
      return null;
    }

    const ParsedData = JSON.parse(data) as T;

    return ParsedData;
  }

  public async invalidade(key: string): Promise<void> {
    // excluindo cache com key
    await this.client.del(key);
  }

  public async invdalidadePrefix(prefix: string): Promise<void> {
    // excluindo cache com prefix
    const keys = await this.client.keys(`${prefix}:*`);

    const pipiline = this.client.pipeline();

    keys.forEach(key => {
      pipiline.del(key);
    });

    await pipiline.exec();
  }
}
