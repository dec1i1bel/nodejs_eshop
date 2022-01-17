const ApiError = require('../error/ApiError');

class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'));
        }
        res.json(id);
    }
}

// модуль сразу отдаёт экземпляр класса, чтобы при его вызове
// можно было обращаться к методам через точку
module.exports = new UserController();