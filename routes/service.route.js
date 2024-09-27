const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/service.controller');
const checkAuth = require('../util/checkAuth');
const checkRole = require('../util/checkRole');


router.get("/services/:apiName", serviceController.getServiceByName);

router.post("/services", serviceController.createService);

router.delete("/services/:apiName", serviceController.deleteServiceByName);

router.get("/services", serviceController.getServices);

router.post("/services/:apiName/instances",checkAuth, checkRole(['admin']), serviceController.addInstance);


module.exports = router;