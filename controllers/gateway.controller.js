const serviceService = require('../services/service.service');
const axios = require("axios");
const redisService = require("../redis");

const gatewayController = {};

gatewayController.getSampleData = async (req, res) => {
    const {apiName, path} = req.params;
    try {

        const service = await serviceService.getServiceByName(apiName);
        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }
        const instances = service.instances;
        if (instances.length === 0) {
            return res.status(404).json({
                message: "No available instances found"
            });
        }

        const instance = instances[0];

        const response = await axios({
            method: req.method,
            url: instance.url + path,
            data: req.body,
            headers: req.headers
        })

        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = gatewayController;