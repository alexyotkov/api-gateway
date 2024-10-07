const Redis = require('redis');
const env = process.env.NODE_ENV || 'development';
const redisConfig = require(__dirname + '/../config/config.js').redis[env];

const redisClient = Redis.createClient(redisConfig);
const redisService = {};

/**
 * Event listener for Redis client errors.
 * Logs the error message.
 *
 * @event error
 * @param {Error} error - The error encountered by the Redis client.
 */
redisClient.on('error', (error) => {
    console.error('Redis client error:', error);
});

/**
 * Connects to Redis.
 * Logs a message once the connection is successful.
 *
 * @returns {Promise<void>} A promise that resolves when the Redis connection is successful.
 */
redisClient.connect().then(() => {
    console.log('Connected to Redis');
});

/**
 * Retrieves data from Redis or fetches it from a callback function.
 * If the data exists in the cache, it returns the cached data.
 * If not, it executes the callback, caches the result, and returns the fresh data.
 *
 * @param {string} key - The key used to identify the cached data.
 * @param {Function} callback - A function to retrieve the data if it's not in the cache.
 * @returns {Promise<any>} The cached data or the fresh data from the callback.
 * @throws {Error} If there is an issue with getting or setting the data in Redis.
 */
redisService.getOrSetCache = async (key, callback) => {
    try {
        const data = await redisClient.get(key);
        if (data) {
            return JSON.parse(data);
        } else {
            const serviceData = await callback();
            await redisClient.setEx(key, 3600, JSON.stringify(serviceData));
            return serviceData;
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Invalidates a specific cache entry by key.
 *
 * @param {string} key - The key of the cache entry to delete.
 * @returns {Promise<void>} A promise that resolves once the cache entry is deleted.
 * @throws {Error} If there is an issue with deleting the cache entry.
 */
redisService.invalidateCache = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        throw error;
    }
};

/**
 * Updates or sets a cache entry with a new value.
 *
 * @param {string} key - The key for the cache entry.
 * @param {object} value - The value to store in the cache.
 * @returns {Promise<void>} A promise that resolves once the cache entry is updated.
 * @throws {error} If there is an issue with setting the new value in Redis.
 */
redisService.updateCache = async (key, value) => {
    try {
        const data = await redisClient.setEx(key, 3600, JSON.stringify(value));
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = redisService;
