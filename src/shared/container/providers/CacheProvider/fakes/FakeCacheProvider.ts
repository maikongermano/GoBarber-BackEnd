import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    // busca informação
    const data = this.cache[key];

    // se nao econtrar nada retorna nulo
    if (!data) {
      return null;
    }

    const ParsedData = JSON.parse(data) as T;

    return ParsedData;
  }

  public async invalidade(key: string): Promise<void> {
    // excluindo cache com key
    delete this.cache[key];
  }

  public async invdalidadePrefix(prefix: string): Promise<void> {
    // excluindo cache com prefix
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
