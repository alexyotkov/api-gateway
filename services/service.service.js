const db = require('../models/index');
const redisService = require("../redis");
const serviceService = {};
const Service = db['Service'];

/**
 * Creates a new service entry in the database and invalidates the cache that holds all services.
 *
 * @async
 * @function createService
 * @param {Object} params - The parameters for creating a service.
 * @param {string} params.apiName - The name of the API for the service.
 * @param {string} params.loadbalanceStrategy - The load balancing strategy for the service.
 * @returns {Promise<Object>} The created service object.
 * @throws error
 */
serviceService.createService = async ({apiName, loadbalanceStrategy}) => {
    try {
        const service = await Service.create({
            apiName: apiName,
            loadbalanceStrategy: loadbalanceStrategy
        });
        await redisService.invalidateCache('services');
        return service;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves a service entry from the database (or from cache) by its API name.
 *
 * @async
 * @function getServiceByName
 * @param {string} apiName - The name of the API to search for.
 * @returns {Promise<Object|null>} The service object if found, or null if not found.
 * @throws error
 */
serviceService.getServiceByName = async (apiName) => {
    try {
        const service = await redisService.getOrSetCache(`service:${apiName}`, () => {
                return Service.findOne({
                    where: {apiName: apiName},
                    include: 'instances'
                })
            }
        );
        return service;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves all service entries from the database or from the cache if they are present.
 *
 * @async
 * @function getServices
 * @returns {Promise<Array<Object>>} An array of service objects.
 * @throws error
 */
serviceService.getServices = async () => {
    try {
        const services = await redisService.getOrSetCache('services', ()=>{
            return Service.findAll({include: 'instances'});
        })
        return services;
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a service entry from the database by its API name. Also invalidates cache for that service.
 *
 * @async
 * @function deleteServiceByName
 * @param {string} apiName - The name of the API to delete.
 * @returns {Promise<Object|null>} The deleted service object if found and deleted, or null if not found.
 * @throws error
 */
serviceService.deleteServiceByName = async (apiName) => {
    try {
        const service = await Service.findOne({where: {apiName: apiName}, include: 'instances'});
        if (service) {
            const serviceToBeDeleted = service.get({plain: true});
            await service.destroy(); // Ensure to await the destruction
            await redisService.invalidateCache(`service:${apiName}`);
            return serviceToBeDeleted;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a new instance to an existing service. Also resets the cache for that service.
 *
 * @async
 * @function addInstance
 * @param {string} apiName - The name of the API to which the instance will be added.
 * @param {Object} params - The parameters for the instance.
 * @param {string} params.url - The URL of the instance.
 * @param {string} params.status - The status of the instance.
 * @returns {Promise<Object|null>} The created instance object if successful, or null if the service is not found.
 * @throws error
 */
serviceService.addInstance = async (apiName, {url, status}) => {
    try {
        const service = await Service.findOne({where: {apiName: apiName}});
        if (service) {
            const instance = await service.createInstance({
                url: url,
                status: status,
            });
            await redisService.invalidateCache(`service:${apiName}`);
            return instance;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = serviceService;
