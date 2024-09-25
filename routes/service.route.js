const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/service.controller');


router.get("/services/:apiName", serviceController.getServiceByName);

router.post("/services", serviceController.createService);

router.delete("/services/:apiName", serviceController.deleteServiceByName);

router.get("/services", serviceController.getServices);

router.post("/services/:apiName/instances", serviceController.addInstance);


module.exports = router;