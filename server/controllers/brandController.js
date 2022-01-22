const { Brand } = require("../models/models");
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.json(brand);
    }
    
    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}

// модуль сразу отдаёт экземпляр класса, чтобы при его вызове
// можно было обращаться к методам через точку
module.exports = new BrandController();