const serviceService = require('../services/service.service');

const serviceController = {};

serviceController.createService = (req, res) => {
    serviceService.createService(req.body).then((service) => {
        res.send(service);
    }).catch((error) => {
        res.send(error);
    });
}

serviceController.getServiceByName = (req, res) => {
    serviceService.getServiceByName(req.params.apiName).then((service) => {
        res.send(service);
    }).catch((error) => {
        res.send(error);
    });
}

serviceController.getServices = (req, res) => {
    serviceService.getServices().then((services) => {
        res.send(services);
    }).catch((error) => {
        res.send(error);
    });
}

serviceController.deleteServiceByName = (req, res) => {
    serviceService.deleteServiceByName(req.params.apiName).then((service) => {
        res.send(service);
    }).catch((error) => {
        res.send(error);
    });
}

serviceController.addInstance = (req, res) => {
    serviceService.addInstance(req.params.apiName, req.body).then((instance) => {
        res.send(instance);
    }).catch((error) => {
        res.send(error);
    })
}

module.exports = serviceController;