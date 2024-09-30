const db = require('../models/index');
const serviceService = {};
const Service = db['Service'];

/**
 * Creates a new service entry in the database.
 *
 * @async
 * @function createService
 * @param {Object} params - The parameters for creating a service.
 * @param {string} params.apiName - The name of the API for the service.
 * @param {string} params.loadbalanceStrategy - The load balancing strategy for the service.
 * @returns {Promise<Object>} The created service object or an error.
 */
serviceService.createService = async ({ apiName, loadbalanceStrategy }) => {
    try {
        const service = await Service.create({
            apiName: apiName,
            loadbalanceStrategy: loadbalanceStrategy
        });
        return service;
    } catch (error) {
        return error;
    }
}

/**
 * Retrieves a service entry from the database by its API name.
 *
 * @async
 * @function getServiceByName
 * @param {string} apiName - The name of the API to search for.
 * @returns {Promise<Object|null>} The service object if found, or null if not found, or an error.
 */
serviceService.getServiceByName = async (apiName) => {
    try {
        const service = await Service.findOne({ where: { apiName: apiName } });
        return service;
    } catch (error) {
        return error;
    }
}

/**
 * Retrieves all service entries from the database.
 *
 * @async
 * @function getServices
 * @returns {Promise<Array<Object>>} An array of service objects or an error.
 */
serviceService.getServices = async () => {
    try {
        const services = await Service.findAll();
        return services;
    } catch (error) {
        return error;
    }
}

/**
 * Deletes a service entry from the database by its API name.
 *
 * @async
 * @function deleteServiceByName
 * @param {string} apiName - The name of the API to delete.
 * @returns {Promise<Object|null>} The deleted service object if found and deleted, or null if not found, or an error.
 */
serviceService.deleteServiceByName = async (apiName) => {
    try {
        const service = await Service.findOne({ where: { apiName: apiName } });
        if (service) {
            const serviceToBeDeleted = service.get({ plain: true });
            await service.destroy(); // Ensure to await the destruction
            return serviceToBeDeleted;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
}

/**
 * Adds a new instance to an existing service.
 *
 * @async
 * @function addInstance
 * @param {string} apiName - The name of the API to which the instance will be added.
 * @param {Object} params - The parameters for the instance.
 * @param {string} params.url - The URL of the instance.
 * @param {string} params.status - The status of the instance.
 * @returns {Promise<Object|null>} The created instance object if successful, or null if the service is not found, or an error.
 */
serviceService.addInstance = async (apiName, { url, status }) => {
    try {
        const service = await Service.findOne({ where: { apiName: apiName } });
        if (service) {
            const instance = await service.createInstance({
                url: url,
                status: status,
            });
            return instance;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
}

module.exports = serviceService;
