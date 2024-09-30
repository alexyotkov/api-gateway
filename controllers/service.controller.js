const serviceService = require('../services/service.service');

const serviceController = {};

/**
 * Creates a new service.
 *
 * @async
 * @function createService
 * @memberof serviceController
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing service data.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response containing the newly created service or an error message.
 */
serviceController.createService = (req, res) => {
    serviceService.createService(req.body).then((service) => {
        res.status(201).json(service);
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });
}

/**
 * Retrieves a service by its API name.
 *
 * @async
 * @function getServiceByName
 * @memberof serviceController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.apiName - The name of the API to retrieve the service.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response containing the requested service or an error message.
 */
serviceController.getServiceByName = (req, res) => {
    serviceService.getServiceByName(req.params.apiName).then((service) => {
        res.status(200).json(service);
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });
}

/**
 * Retrieves all services.
 *
 * @async
 * @function getServices
 * @memberof serviceController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response containing a list of services or an error message.
 */
serviceController.getServices = (req, res) => {
    serviceService.getServices().then((services) => {
        res.status(200).json(services);
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });
}

/**
 * Deletes a service by its API name.
 *
 * @async
 * @function deleteServiceByName
 * @memberof serviceController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.apiName - The name of the API to delete the service.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response confirming the deletion or an error message.
 */
serviceController.deleteServiceByName = (req, res) => {
    serviceService.deleteServiceByName(req.params.apiName).then((service) => {
        res.status(200).json(service);
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });
}

/**
 * Adds an instance to a service by its API name.
 *
 * @async
 * @function addInstance
 * @memberof serviceController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.apiName - The name of the API to which the instance will be added.
 * @param {Object} req.body - The instance data to be added.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response containing the newly added instance or an error message.
 */
serviceController.addInstance = (req, res) => {
    serviceService.addInstance(req.params.apiName, req.body).then((instance) => {
        res.status(201).json(instance);
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    })
}

module.exports = serviceController;
