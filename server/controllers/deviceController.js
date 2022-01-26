const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
// const { json } = require('sequelize/dist');

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', filename));

            if (typeof info !== 'undefined') {
                // info приходит в виде строки, поэтому сначала парсим его в json,
                // а потом переводим в js-объект
                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }
    
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
            
            // запросы к модели в зависимости от http-запроса

            if ((typeof brandId === 'undefined') && (typeof typeId === 'undefined')) {
                devices = await Device.findAndCountAll({limit: itemsLimit, offset: offset});
            }
    
            if ((typeof brandId !== 'undefined') && (typeof typeId === 'undefined')) {
                devices = await Device.findAndCountAll({where:{brandId}, itemsLimit, offset});
            }
    
            if ((typeof brandId === 'undefined') && (typeof typeId !== 'undefined')) {
                devices = await Device.findAndCountAll({where:{typeId}, itemsLimit, offset});
            }
    
            if ((typeof brandId === 'undefined') && (typeof typeId !== 'undefined')) {
                devices = await Device.findAndCountAll({where:{typeId, brandId}, itemsLimit, offset});
            }
    
            return res.json(devices);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getOne(req, res) {
        const {id} = req.params;

        // в запросе сразу тянем его DeviceInfo (параметр include), чтобы иметь возможность вывести его на странице
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )

        return res.json(device);
    }
}

module.exports = new DeviceController();