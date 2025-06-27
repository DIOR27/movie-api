const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.connect().catch(console.error);

async function get(key) {
    return await client.get(key);
}

async function set(key, value, ttl) {
    await client.set(key, value, { EX: ttl });
}

async function del(key) {
    await client.del(key);
}

module.exports = { get, set, del };
