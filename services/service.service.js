const db = require('../models/index');
const serviceService = {};
const Service = db['Service'];

serviceService.createService = async ({apiName, loadbalanceStrategy}) => {
    try {
        const service = await Service.create({
            apiName: apiName,
            loadbalanceStrategy: loadbalanceStrategy
        });
        return service;
    }
    catch (error) {
        return error;
    }
}

serviceService.getServiceByName = async (apiName) => {
    try {
        const service = await Service.findOne({where: {apiName: apiName}});
        return service;
    }
    catch (error) {
        return error;
    }
}

serviceService.getServices = async () => {
    try {
        const services = await Service.findAll();
        return services;
    }
    catch (error) {
        return error;
    }
}

serviceService.deleteServiceByName = async (apiName) => {
    try {
        const service = await Service.findOne({where: {apiName: apiName}});
        if (service){
            const serviceToBeDeleted = service.get({plain: true});
            service.destroy();
            return serviceToBeDeleted;
        }
        else {
            return null;
        }

    }
    catch (error) {
        return error;
    }
}

serviceService.addInstance = async (apiName, {url, status}) => {
    try {
        const service = await Service.findOne({where: {apiName: apiName}});
        if (service){
            const instance = service.createInstance({
                url: url,
                status: status,
            });
            return instance;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return error;
    }
}

module.exports = serviceService;