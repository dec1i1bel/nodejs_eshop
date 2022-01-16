class BrandController {
    async create(req, res) {

    }
    
    async getAll(req, res) {

    }
}

// модуль сразу отдаёт экземпляр класса, чтобы при его вызове
// можно было обращаться к методам через точку
module.exports = new BrandController();