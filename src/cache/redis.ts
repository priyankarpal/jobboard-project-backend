import "dotenv/config";
import { Redis } from "ioredis";

interface RedisConfig {
    host: string;
    port: number;
    password?: string;
}
// if (!process.env.REDIS_HOST || !process.env.REDIS_PORT || !process.env.REDIS_PASSWORD) {
//     throw new Error("Missing Redis configuration");
// }
const client = new Redis({
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD!
} as RedisConfig);

client.on("connect", () => {
    console.log("redis connected");
});


export default client;
