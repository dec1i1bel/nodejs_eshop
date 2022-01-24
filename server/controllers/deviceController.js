const uuid = require('uuid');
const path = require('path');
const {Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;

            let filename = uuid.v4() + '.jpg';
            
            img.mv(path.resolve(__dirname, '..', 'static', filename));
    
            const device = await Device.create({name, price, brandId, typeId, img: filename});

            return res.json(device);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }

    }
    
    async getAll(req, res, next) {
        try {
            // получаем из запроса id бренда и/или типа b данные для постраничной навигации
            const {brandId, typeId, limit, page} = req.query;

            const paginPage = page || 1;
            const itemsLimit = limit || 6;

            // отступ в запросе от начала списка товаров для данной страницы навигации
            const offset = paginPage * itemsLimit - itemsLimit;
    
            let devices;
            
            // если в запросе нет ни бренда, ни типа
            if ((typeof brandId === 'undefined') && (typeof typeId === 'undefined')) {
                devices = await Device.findAll({limit: itemsLimit});
            }
    
            // если только id бренда:
            if ((typeof brandId !== 'undefined') && (typeof typeId === 'undefined')) {
                devices = await Device.findAll({where:{brandId}, itemsLimit, offset});
            }
    
            // если только id типа:
            if ((typeof brandId === 'undefined') && (typeof typeId !== 'undefined')) {
                devices = await Device.findAll({where:{typeId}, itemsLimit, offset});
            }
    
            // если id типа и бренда:
            if ((typeof brandId === 'undefined') && (typeof typeId !== 'undefined')) {
                devices = await Device.findAll({where:{typeId, brandId}, itemsLimit, offset});
            }
    
            return res.json(devices);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getOne(req, res) {

    }
}

module.exports = new DeviceController();