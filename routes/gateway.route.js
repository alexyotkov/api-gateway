const express = require('express');

const router = express.Router();

const gatewayController = require('../controllers/gateway.controller');
const checkAuth = require("../util/checkAuth");

/**
 * Gateway routes for managing request routing to microservices.
 *
 * All routes are protected by the `checkAuth` middleware to ensure that
 * the user is authenticated.
 *
 * @module routes/gateway
 */

/**
 * Route to retrieve a service by API name.
 * Requires authentication.
 *
 * @name ALL /services/:apiName
 * @function
 * @memberof module:routes/gateway
 * @param {string} apiName - The name of the API service to use
 * @param {string} path - The endpoint of the API to use
 * @middleware checkAuth
 */
router.all("/:apiName/:path", checkAuth, gatewayController.getSampleData);

module.exports = router;