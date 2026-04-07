import { createClient, RedisClientType } from 'redis';

export interface CacheConfig {
  url: string;
  db: number;
  ttl: {
    public: number;
    detailed: number;
  };
}

export class HealthCache {
  private client: RedisClientType | null = null;
  private config: CacheConfig;
  private fallbackCache = new Map<string, { data: unknown; timestamp: number }>();
  private initPromise: Promise<void> | null = null;
  private isInitializing = false;

  constructor() {
    this.config = {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      db: parseInt(process.env.REDIS_DB || '0'),
      ttl: {
        public: parseInt(process.env.HEALTH_CHECK_CACHE_TTL_PUBLIC || '10') * 1000,
        detailed: parseInt(process.env.HEALTH_CHECK_CACHE_TTL_DETAILED || '5') * 1000
      }
    };

    // Don't initialize Redis during build time - only at runtime
    if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
      // Only initialize in development server mode, not during build
      this.initializeRedis();
    }
  }

  private async initializeRedis() {
    if (this.isInitializing || this.client) return;
    
    try {
      this.isInitializing = true;
      this.client = createClient({
        url: this.config.url,
        database: this.config.db
      });

      this.client.on('error', (err) => {
        console.warn('Redis cache error, falling back to memory cache:', err);
        this.client = null;
        this.isInitializing = false;
      });

      this.client.on('connect', () => {
        console.info('Redis cache connected successfully');
      });

      await this.client.connect();
    } catch (error) {
      console.warn('Failed to initialize Redis cache, using memory fallback:', error);
      this.client = null;
    } finally {
      this.isInitializing = false;
    }
  }

  private async ensureRedisConnection(): Promise<void> {
    // Skip Redis initialization during build time or if already initialized
    if (this.client || this.isInitializing) return;
    
    // Only initialize Redis at runtime (when handling actual requests)
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      if (!this.initPromise) {
        this.initPromise = this.initializeRedis();
      }
      await this.initPromise;
    }
  }

  async get(key: string): Promise<unknown | null> {
    // Ensure Redis is initialized for runtime requests
    await this.ensureRedisConnection();
    
    try {
      // Try Redis first
      if (this.client) {
        const cached = await this.client.get(key);
        if (cached) {
          return JSON.parse(cached);
        }
      }

      // Fallback to memory cache
      const memoryCached = this.fallbackCache.get(key);
      if (memoryCached) {
        const now = Date.now();
        if (now - memoryCached.timestamp < this.config.ttl.public) {
          return memoryCached.data;
        }
        this.fallbackCache.delete(key);
      }

      return null;
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttlType: 'public' | 'detailed' = 'public'): Promise<void> {
    // Ensure Redis is initialized for runtime requests
    await this.ensureRedisConnection();
    
    const ttl = this.config.ttl[ttlType];
    const serialized = JSON.stringify(value);

    try {
      // Try Redis first
      if (this.client) {
        await this.client.setEx(key, Math.ceil(ttl / 1000), serialized);
      } else {
        // Fallback to memory cache
        this.fallbackCache.set(key, {
          data: value,
          timestamp: Date.now()
        });

        // Clean up old memory cache entries
        this.cleanupMemoryCache();
      }
    } catch (error) {
      console.warn('Cache set error, using memory fallback:', error);
      
      // Always fallback to memory cache on Redis error
      this.fallbackCache.set(key, {
        data: value,
        timestamp: Date.now()
      });
    }
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      if (this.client) {
        const keys = await this.client.keys(pattern);
        if (keys.length > 0) {
          await this.client.del(keys);
          console.info(`Invalidated ${keys.length} cache keys matching: ${pattern}`);
        }
      }

      // Also clear from memory cache
      for (const key of this.fallbackCache.keys()) {
        if (key.includes(pattern.replace('*', ''))) {
          this.fallbackCache.delete(key);
        }
      }
    } catch (error) {
      console.warn('Cache invalidation error:', error);
    }
  }

  async invalidateAll(): Promise<void> {
    try {
      if (this.client) {
        await this.client.flushDb();
      }
      this.fallbackCache.clear();
      console.info('All health check cache cleared');
    } catch (error) {
      console.warn('Cache clear error:', error);
    }
  }

  private cleanupMemoryCache(): void {
    const now = Date.now();
    const maxAge = Math.max(this.config.ttl.public, this.config.ttl.detailed);
    
    for (const [key, entry] of this.fallbackCache.entries()) {
      if (now - entry.timestamp > maxAge) {
        this.fallbackCache.delete(key);
      }
    }
  }

  async close(): Promise<void> {
    try {
      if (this.client) {
        await this.client.quit();
      }
    } catch (error) {
      console.warn('Error closing Redis connection:', error);
    }
  }

  // Health check specific cache keys
  getPublicCacheKey(): string {
    return 'snapmyfine:health:public';
  }

  getDetailedCacheKey(): string {
    return 'snapmyfine:health:detailed';
  }

  getServiceCacheKey(serviceName: string): string {
    return `snapmyfine:health:service:${serviceName}`;
  }
}

// Singleton instance
let cacheInstance: HealthCache | null = null;

export function getHealthCache(): HealthCache {
  if (!cacheInstance) {
    cacheInstance = new HealthCache();
  }
  return cacheInstance;
}