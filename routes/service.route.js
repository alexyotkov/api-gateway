const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');
const checkAuth = require('../util/checkAuth');
const checkRole = require('../util/checkRole');

/**
 * Service routes for managing API services and instances.
 *
 * All routes are protected by the `checkAuth` middleware to ensure that
 * the user is authenticated.
 *
 * @module routes/service
 */

/**
 * Route to retrieve a service by API name.
 * Requires authentication.
 *
 * @name GET /services/:apiName
 * @function
 * @memberof module:routes/service
 * @param {string} apiName - The name of the API service to retrieve
 * @middleware checkAuth
 */
router.get("/services/:apiName", checkAuth, serviceController.getServiceByName);

/**
 * Route to create a new service.
 * Requires authentication.
 *
 * @name POST /services
 * @function
 * @memberof module:routes/service
 * @middleware checkAuth
 */
router.post("/services", checkAuth, serviceController.createService);

/**
 * Route to delete a service by API name.
 * Requires authentication.
 *
 * @name DELETE /services/:apiName
 * @function
 * @memberof module:routes/service
 * @param {string} apiName - The name of the API service to delete
 * @middleware checkAuth
 */
router.delete("/services/:apiName", checkAuth, serviceController.deleteServiceByName);

/**
 * Route to retrieve a list of all services.
 * Requires authentication.
 *
 * @name GET /services
 * @function
 * @memberof module:routes/service
 * @middleware checkAuth
 */
router.get("/services", checkAuth, serviceController.getServices);

/**
 * Route to add an instance to an API service.
 * Requires authentication.
 *
 * @name POST /services/:apiName/instances
 * @function
 * @memberof module:routes/service
 * @param {string} apiName - The name of the API service to add an instance to
 * @middleware checkAuth
 */
router.post("/services/:apiName/instances", checkAuth, serviceController.addInstance);

module.exports = router;
