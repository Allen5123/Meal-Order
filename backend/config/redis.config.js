import 'dotenv/config';
export const redisconfig = {
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
}