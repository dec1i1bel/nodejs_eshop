class DeviceController {
    async create(req, res) {

    }
    
    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}

// модуль сразу отдаёт экземпляр класса, чтобы при его вызове
// можно было обращаться к методам через точку
module.exports = new DeviceController();