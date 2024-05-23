import "dotenv/config";
import { Redis } from "ioredis";

interface RedisConfig {
    host: string;
    port: number;
    password?: string;
}

const client = new Redis({
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string),
    password: process.env.REDIS_PASSWORD
} as RedisConfig);

export default client;
