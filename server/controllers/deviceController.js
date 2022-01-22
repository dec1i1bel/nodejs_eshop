const uuid = require('uuid');
const path = require('path');
const {Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brand_id, type_id, info} = req.body;
            const {img} = req.files;

            let filename = uuid.v4() + '.jpg';
            
            img.mv(path.resolve(__dirname, '..', 'static', filename));
    
            const device = await Device.create({name, price, brand_id, type_id, img: filename});

            return res.json(device);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }

    }
    
    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}

module.exports = new DeviceController();